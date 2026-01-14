// src/store/reducers/cart.js
import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  LOAD_USER_CART,
  CLEAR_CART,
} from "../actions/type";
import { minValueOne } from "../../utils";

// ============================================
// ESTADO INICIAL (SIN LOCALSTORAGE)
// ============================================
const init = {
  carts: [],             // ✅ Cambiar 'cart' a 'carts' para consistencia
  currentUserId: null,
  isLoading: false,
};

// ============================================
// REDUCER
// ============================================
export const cartReducer = (state = init, action) => {
  let currentCart;

  switch (action.type) {

    // ==========================================
    // 🔥 CARGAR CARRITO (desde Backend)
    // ==========================================
    case LOAD_USER_CART:
      const userId = action.payload;

      console.log('🔥 LOAD_USER_CART recibido:', {
        userId,
        cart: action.cart,
        cartType: typeof action.cart,
        isArray: Array.isArray(action.cart)
      });

      // Si no hay userId (logout), limpiar carrito
      if (!userId) {
        console.log('🚪 Sesión cerrada - Carrito limpiado');
        return {
          ...state,
          currentUserId: null,
          carts: [],
          isLoading: false
        };
      }

      // ✅ Asegurar que siempre sea un array
      let backendCart = action.cart;

      // Si viene undefined o null
      if (!backendCart) {
        console.warn('⚠️ action.cart es undefined o null');
        backendCart = [];
      }

      // Si el backend devuelve un objeto con propiedad 'data' o 'cart'
      else if (!Array.isArray(backendCart)) {
        console.log('📦 Extrayendo array del objeto:', backendCart);
        backendCart = backendCart.data || backendCart.cart || backendCart.items || [];
      }

      // Asegurar que sea un array
      if (!Array.isArray(backendCart)) {
        console.warn('⚠️ El carrito no es un array después de extraer:', backendCart);
        backendCart = [];
      }

      console.log(`✅ Reducer: Carrito cargado para usuario ${userId}`, {
        items: backendCart.length,
        cart: backendCart
      });

      return {
        ...state,
        currentUserId: userId,
        carts: backendCart,
        isLoading: false
      };

    // ==========================================
    // AGREGAR AL CARRITO (Local solo)
    // ==========================================
    case ADD_TO_CART:
      const productId = action.product.id;
      const productQty = action.qty ? action.qty : 1;

      if (state.carts.findIndex((product) => product.id === productId) !== -1) {
        // Si el producto ya existe, incrementar cantidad
        currentCart = state.carts.reduce((cartAcc, product) => {
          if (product.id === productId) {
            cartAcc.push({
              ...product,
              selected_color: action.color,
              selected_size: action.size,
              qty: product.qty + productQty,
              sum:
                ((product.price * (100 - product.discount)) / 100) *
                (product.qty + productQty),
            });
          } else {
            cartAcc.push(product);
          }
          return cartAcc;
        }, []);
      } else {
        // Si el producto no existe, agregarlo
        currentCart = [
          ...state.carts,
          {
            ...action.product,
            selected_color: action.color,
            selected_size: action.size,
            qty: productQty,
            sum:
              ((action.product.price * (100 - action.product.discount)) / 100) *
              productQty,
          },
        ];
      }

      console.log('🛒 Producto agregado localmente:', action.product.title);

      return {
        ...state,
        carts: currentCart,
      };

    // ==========================================
    // REMOVER DEL CARRITO
    // ==========================================
    case REMOVE_FROM_CART:
      currentCart = state.carts.filter((item) => item.id !== action.product_id);

      console.log('🗑️ Producto removido del carrito');

      return {
        ...state,
        carts: currentCart,
      };

    // ==========================================
    // INCREMENTAR CANTIDAD
    // ==========================================
    case INCREMENT_QUANTITY:
      const inc_productId = action.product_id;
      currentCart = state.carts.reduce((cartAcc, product) => {
        if (product.id === inc_productId) {
          cartAcc.push({
            ...product,
            qty: product.qty + 1,
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      console.log('➕ Cantidad incrementada');

      return {
        ...state,
        carts: currentCart,
      };

    // ==========================================
    // DECREMENTAR CANTIDAD
    // ==========================================
    case DECREMENT_QUANTITY:
      const decProductId = action.product_id;
      currentCart = state.carts.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          cartAcc.push({
            ...product,
            qty: minValueOne(product.qty - 1),
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      console.log('➖ Cantidad decrementada');

      return {
        ...state,
        carts: currentCart,
      };

    // ==========================================
    // 🔥 LIMPIAR CARRITO
    // ==========================================
    case CLEAR_CART:
      console.log('🧹 Carrito limpiado completamente');

      return {
        ...state,
        carts: [],
      };

    default:
      return state;
  }
};

export default cartReducer;