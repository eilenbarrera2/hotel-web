import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ Importar useDispatch
import SectionTitleS2 from '../SectionTitleS2/'
import roomService from "../../api/roomService";
import { authService } from "../../api/authService";
import { LOAD_USER_CART } from "../../store/actions/type"; // ✅ Importar la acción correcta

const SearchRooms = ({ products, searchParams }) => {
  const [loadingItems, setLoadingItems] = useState({});
  const dispatch = useDispatch(); // ✅ Usar dispatch

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const handleAddToCart = async (product) => {
    // ✅ Prevenir doble clic
    if (loadingItems[product.id]) {
      console.warn('⚠️ Ya se está procesando esta habitación');
      return;
    }

    const token = localStorage.getItem('token');
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();

    console.log('🔍 Debug Auth:', {
      hasToken: !!token,
      isAuthenticated,
      userId: user?.id,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'NO TOKEN'
    });

    if (!isAuthenticated || !token) {
      alert('Debes iniciar sesión para agregar habitaciones al carrito');
      return;
    }

    setLoadingItems(prev => ({ ...prev, [product.id]: true }));

    try {
      // ✅ Preparar datos para el backend
      const cartItem = {
        room_id: product.id,
        check_in: searchParams.checkIn,
        check_out: searchParams.checkOut,
        adults: searchParams.adults || 2,
        children: searchParams.children || 0,
        nights: product.nights,
        price_per_night: product.price,
        total_price: product.total_price
      };

      console.log('📤 Enviando al carrito:', cartItem);

      // ✅ 1. Enviar al backend (devuelve el carrito completo actualizado)
      const response = await roomService.addToCart(cartItem);
      console.log('✅ Respuesta del servidor:', response);

      // ✅ 2. El carrito ya viene actualizado en response.cart
      const updatedCart = response.cart || [];
      console.log('🛒 Carrito actualizado:', updatedCart);

      // ✅ 3. Extraer el array de items del carrito
      let cartItems = [];
      if (Array.isArray(updatedCart)) {
        cartItems = updatedCart;
      } else if (updatedCart.data) {
        cartItems = Array.isArray(updatedCart.data) ? updatedCart.data : [];
      } else if (updatedCart.cart) {
        cartItems = Array.isArray(updatedCart.cart) ? updatedCart.cart : [];
      } else if (updatedCart.items) {
        cartItems = Array.isArray(updatedCart.items) ? updatedCart.items : [];
      }

      console.log('📦 Items del carrito extraídos:', cartItems);

      // ✅ 4. Actualizar Redux con el carrito completo del backend
      dispatch({
        type: LOAD_USER_CART,
        payload: user.id,
        cart: cartItems
      });

      alert(`✅ Habitación ${product.room_number} agregada al carrito`);

    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);

      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Opcional: redirigir a login
        // window.location.href = '/login';
      } else {
        alert(error.message || 'Error al agregar al carrito');
      }
    } finally {
      setTimeout(() => {
        setLoadingItems(prev => ({ ...prev, [product.id]: false }));
      }, 500);
    }
  };

  return (
    <div className="wpo-room-area section-padding">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-md-8">
          </div>
        </div>
        <div className="room-wrap">
          <div className="row">
            {products.length > 0 ? (
              products.map((product, pitem) => (
                <div className="col-lg-4 col-md-6 col-12" key={pitem}>
                  <div className="room-item">
                    <div className="room-img">
                      <img src={product.proImg} alt={product.title} />
                      <div className="room-number-badge">
                        Hab. {product.room_number}
                      </div>
                      <div className="room-floor-badge">
                        Piso {product.floor}
                      </div>
                    </div>
                    <div className="room-content">
                      <h2>
                        <Link onClick={ClickHandler} to={`/room-single/${product.room_type_id}`}>
                          {product.title}
                        </Link>
                      </h2>

                      <ul className="room-details-list">
                        <li>
                          <strong>HABITACIÓN:</strong>
                          <span>#{product.room_number}</span>
                        </li>
                        <li>
                          <strong>PISO:</strong>
                          <span>{product.floor}</span>
                        </li>
                        <li>
                          <strong>CAPACIDAD:</strong>
                          <span>{product.capacity} adultos, {product.Children} niños</span>
                        </li>
                      </ul>

                      {product.amenities && product.amenities.length > 0 && (
                        <div className="amenities-section">
                          <strong>Amenidades:</strong>
                          <ul className="amenities">
                            {product.amenities.slice(0, 4).map((amenity, i) => (
                              <li key={i}>
                                <i className="fa fa-check-circle"></i> {amenity}
                              </li>
                            ))}
                          </ul>
                          {product.amenities.length > 4 && (
                            <span className="more-amenities">
                              +{product.amenities.length - 4} más
                            </span>
                          )}
                        </div>
                      )}

                      <div className="pricing-info">
                        <div className="price-per-night">
                          <h3>${product.price.toFixed(2)} <span>/ Noche</span></h3>
                        </div>
                        {product.nights && product.total_price && (
                          <div className="total-price">
                            <strong>Total:</strong> ${product.total_price.toFixed(2)}
                            <small> ({product.nights} {product.nights === 1 ? 'noche' : 'noches'})</small>
                          </div>
                        )}
                      </div>

                      {product.cancellation_policy && (
                        <div className="cancellation-policy">
                          <small>
                            <i className="fa fa-info-circle"></i> {product.cancellation_policy}
                          </small>
                        </div>
                      )}

                      <div className="add-to-cart">
                        <button
                          className="theme-btn mt-3"
                          onClick={() => handleAddToCart(product)}
                          disabled={loadingItems[product.id]}
                          type="button"
                        >
                          {loadingItems[product.id] ? (
                            <>
                              <i className="fa fa-spinner fa-spin"></i> Agregando...
                            </>
                          ) : (
                            <>
                              <i className="fa fa-shopping-cart"></i> Seleccionar esta Habitación
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-warning text-center">
                  <h4>No hay habitaciones disponibles</h4>
                  <p>No se encontraron habitaciones para las fechas y capacidad seleccionadas.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRooms;