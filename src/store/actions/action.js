import roomService from '../../api/roomService'; // ✅ Usar roomService
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  LOAD_USER_CART,
  CLEAR_CART,
} from "./type";

// ============================================
// 🔥 CARGAR CARRITO DESDE BACKEND
// ============================================
export const loadUserCart = (userId, cartData = null) => async (dispatch) => {
  try {
    // Si no hay userId, limpiar carrito
    if (!userId) {
      console.log('🧹 Limpiando carrito (no hay usuario)');
      dispatch({ type: LOAD_USER_CART, payload: null, cart: [] });
      return;
    }

    console.log('🔄 Cargando carrito para:', userId);

    // Si ya tenemos los datos del carrito (pasados desde Header), usarlos
    if (cartData !== null) {
      const cartItems = Array.isArray(cartData) ? cartData : [];
      console.log(`✅ Carrito recibido: ${cartItems.length} items`);
      dispatch({ type: LOAD_USER_CART, payload: userId, cart: cartItems });
      return;
    }

    // Si no, obtener del backend
    const response = await roomService.getCart();

    // Extraer el array de items
    let cartItems = [];
    if (Array.isArray(response)) {
      cartItems = response;
    } else if (response.data) {
      cartItems = Array.isArray(response.data) ? response.data : [];
    } else if (response.cart) {
      cartItems = Array.isArray(response.cart) ? response.cart : [];
    } else if (response.items) {
      cartItems = Array.isArray(response.items) ? response.items : [];
    }

    console.log(`✅ Carrito cargado del backend: ${cartItems.length} items`);
    dispatch({ type: LOAD_USER_CART, payload: userId, cart: cartItems });

  } catch (error) {
    console.error('❌ Error al cargar carrito:', error);
    dispatch({ type: LOAD_USER_CART, payload: userId, cart: [] });
  }
};

// ============================================
// 🔥 AGREGAR AL CARRITO
// ============================================
export const addToCart = (product, qty = 1) => async (dispatch, getState) => {
  // 1. Buscar usuario
  let currentUser = null;

  // Intento A: Desde Redux
  const reduxUser = getState().user;
  if (reduxUser && reduxUser.user) {
    currentUser = reduxUser.user;
  }

  // Intento B: Desde LocalStorage
  if (!currentUser) {
    currentUser = authService.getCurrentUser();
  }

  if (!currentUser) {
    console.warn("⚠️ Usuario no autenticado");
    toast.info("Inicia sesión para agregar al carrito");
    return;
  }

  // 2. Actualización Visual Inmediata (opcional, porque vamos a recargar del backend)
  dispatch({
    type: ADD_TO_CART,
    product,
    qty
  });
  console.log('⚡ Agregado visualmente:', product.title);

  // 3. Guardar en Backend
  try {
    // Preparar datos
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    const roomData = {
      room_id: product.id,
      check_in: product.check_in || tomorrow.toISOString().split('T')[0],
      check_out: product.check_out || nextDay.toISOString().split('T')[0],
      adults: product.capacity || 2,
      children: 0,
      nights: product.nights || 1,
      price_per_night: product.price,
      total_price: product.total_price || (product.price * (product.nights || 1))
    };

    console.log('📤 Enviando al servidor:', roomData);
    await roomService.addToCart(roomData);

    toast.success("Agregado al carrito exitosamente");

    // 4. Recargar carrito completo del backend
    const userId = currentUser.id || currentUser.email;
    dispatch(loadUserCart(userId));

  } catch (error) {
    console.error('❌ Error al guardar en backend:', error);
    toast.error(error.message || "Error al agregar al carrito");

    // Si falla, revertir el cambio visual
    dispatch({ type: REMOVE_FROM_CART, product_id: product.id });
  }
};

// ============================================
// 🔥 REMOVER DEL CARRITO
// ============================================
export const removeFromCart = (cartItemId) => async (dispatch, getState) => {
  try {
    console.log('🗑️ Eliminando item:', cartItemId);

    // 1. Primero actualizar UI
    dispatch({ type: REMOVE_FROM_CART, product_id: cartItemId });

    // 2. Eliminar del backend
    if (cartItemId && typeof cartItemId === 'number') {
      await roomService.removeFromCart(cartItemId);
      toast.success('Habitación eliminada del carrito');
    }

    // 3. Recargar carrito para sincronizar
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.id || currentUser.email;
      dispatch(loadUserCart(userId));
    }

  } catch (error) {
    console.error('❌ Error al eliminar:', error);
    toast.error('Error al eliminar del carrito');

    // Recargar carrito para sincronizar estado real
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.id || currentUser.email;
      dispatch(loadUserCart(userId));
    }
  }
};

// ============================================
// 🔥 INCREMENTAR CANTIDAD
// ============================================
export const incrementQuantity = (cartItemId, currentQty) => async (dispatch) => {
  try {
    // 1. Actualizar UI inmediatamente
    dispatch({ type: INCREMENT_QUANTITY, product_id: cartItemId });

    // 2. Actualizar en backend
    if (cartItemId && typeof cartItemId === 'number') {
      await roomService.updateCartItem(cartItemId, currentQty + 1);
    }

  } catch (error) {
    console.error('❌ Error al incrementar:', error);
    // Recargar carrito para sincronizar
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.id || currentUser.email;
      dispatch(loadUserCart(userId));
    }
  }
};

// ============================================
// 🔥 DECREMENTAR CANTIDAD
// ============================================
export const decrementQuantity = (cartItemId, currentQty) => async (dispatch) => {
  try {
    if (currentQty <= 1) {
      // Si ya está en 1, no decrementar más
      return;
    }

    // 1. Actualizar UI inmediatamente
    dispatch({ type: DECREMENT_QUANTITY, product_id: cartItemId });

    // 2. Actualizar en backend
    if (cartItemId && typeof cartItemId === 'number') {
      await roomService.updateCartItem(cartItemId, currentQty - 1);
    }

  } catch (error) {
    console.error('❌ Error al decrementar:', error);
    // Recargar carrito para sincronizar
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.id || currentUser.email;
      dispatch(loadUserCart(userId));
    }
  }
};

// ============================================
// 🔥 LIMPIAR CARRITO
// ============================================
export const clearCart = () => async (dispatch) => {
  try {
    console.log('🧹 Limpiando carrito completo...');

    // 1. Limpiar en backend
    await roomService.clearCart();

    // 2. Limpiar en Redux
    dispatch({ type: CLEAR_CART });

    toast.success('Carrito limpiado');

  } catch (error) {
    console.error('❌ Error al limpiar carrito:', error);
    // Limpiar localmente de todos modos
    dispatch({ type: CLEAR_CART });
  }
};