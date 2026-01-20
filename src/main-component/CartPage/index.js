// src/main-component/CartPage/index.js
import React, { Fragment, useEffect, useState } from "react";
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import {
  removeFromCart,
  loadUserCart,
} from "../../store/actions/action";
import { authService } from '../../api/authService';
import roomService from '../../api/roomService';
import { toast } from "react-toastify";

import Logo from '../../images/logo2.png';

const CartPage = (props) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ========================================================
  // 🔥 VERIFICAR AUTENTICACIÓN Y CARGAR CARRITO
  // ========================================================
  useEffect(() => {
    const checkAuth = async () => {
      const user = authService.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        console.log('👤 Usuario autenticado en CartPage:', user.id);

        try {
          // Cargar carrito desde backend
          const cartData = await roomService.getCart();
          console.log('✅ Carrito cargado en CartPage:', cartData);

          // Actualizar Redux con los datos del carrito
          await props.loadUserCart(user.id, cartData);

        } catch (error) {
          console.error('❌ Error al cargar carrito:', error);
          toast.error('Error al cargar el carrito');
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.warning('Debes iniciar sesión para ver tu carrito');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, props]);

  // ========================================================
  // 🔥 MANEJAR ELIMINACIÓN CON CONFIRMACIÓN
  // ========================================================
  const handleRemoveItem = async (cartItem) => {
    if (window.confirm(`¿Eliminar ${cartItem.title} del carrito?`)) {
      try {
        await props.removeFromCart(cartItem.id);
        toast.success('Habitación eliminada del carrito');
      } catch (error) {
        console.error('❌ Error al eliminar:', error);
        toast.error('Error al eliminar la habitación');
      }
    }
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // ✅ Asegurar que carts sea siempre un array
  const carts = Array.isArray(props.carts) ? props.carts : [];

  console.log('🛒 Carrito en CartPage:', {
    length: carts.length,
    items: carts
  });

  // ========================================================
  // PANTALLA DE CARGA
  // ========================================================
  if (isLoading) {
    return (
      <Fragment>
        <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
        <div className="cart-area section-padding">
          <div className="container">
            <div className="text-center" style={{ padding: '100px 0' }}>
              <div style={{ fontSize: '50px', color: '#086AD8', marginBottom: '20px' }}>
                <i className="fi flaticon-loading"></i>
              </div>
              <h3>Cargando tu carrito...</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>
                Obteniendo información desde el servidor
              </p>
            </div>
          </div>
        </div>
        <Footer />
        <Scrollbar />
      </Fragment>
    );
  }

  // ========================================================
  // SIN AUTENTICACIÓN
  // ========================================================
  if (!currentUser) {
    return null;
  }

  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
      <PageTitle pageTitle={"Carrito de Compras"} pagesub={"Carrito"} />

      <div className="cart-area section-padding">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">

                  {/* ========================================== */}
                  {/* 🔥 BADGE USUARIO ACTUAL */}
                  {/* ========================================== */}
                  <div className="user-info-badge" style={{
                    marginBottom: '20px',
                    padding: '15px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fi flaticon-user" style={{
                        color: '#fff',
                        fontSize: '24px',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '8px',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}></i>
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block' }}>
                          Carrito de compras
                        </span>
                        <strong style={{ color: '#fff', fontSize: '16px' }}>
                          {currentUser.name || currentUser.email}
                        </strong>
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {carts.length} {carts.length === 1 ? 'habitación' : 'habitaciones'}
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* 🔥 TABLA DE CARRITO O MENSAJE VACÍO */}
                  {/* ========================================== */}
                  {carts.length > 0 ? (
                    <>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table-responsive cart-wrap">
                          <thead>
                            <tr>
                              <th className="product-2">Tipo de Habitación</th>
                              <th className="stock">No. Habitación</th>
                              <th className="pr">Capacidad</th>
                              <th className="stock">Check-in</th>
                              <th className="stock">Check-out</th>
                              <th className="stock">Noches</th>
                              <th className="stock">Precio/Noche</th>
                              <th className="stock">Total</th>
                              <th className="remove remove-b">Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {carts.map((catItem, index) => (
                              <tr key={catItem.id || index}>
                                {/* TIPO DE HABITACIÓN */}
                                <td className="product">
                                  <ul>
                                    <li className="first-cart">
                                      <strong>{catItem.title}</strong>
                                      {catItem.room_id && (
                                        <small style={{
                                          display: 'block',
                                          color: '#666',
                                          marginTop: '5px',
                                          fontSize: '12px'
                                        }}>
                                          ID: {catItem.room_id}
                                        </small>
                                      )}
                                    </li>
                                  </ul>
                                </td>

                                {/* NÚMERO DE HABITACIÓN */}
                                <td className="stock">
                                  <span style={{
                                    background: '#086AD8',
                                    color: '#fff',
                                    padding: '5px 12px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                  }}>
                                    {catItem.room_number || 'N/A'}
                                  </span>
                                </td>

                                {/* CAPACIDAD */}
                                <td className="ptice">
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="fi flaticon-user" style={{ color: '#086AD8' }}></i>
                                    <span>{catItem.capacity || catItem.adults} adulto(s)</span>
                                  </div>
                                </td>

                                {/* CHECK-IN */}
                                <td className="stock">
                                  {catItem.check_in ? (
                                    <div>
                                      <i className="fi flaticon-calendar" style={{
                                        color: '#52c41a',
                                        marginRight: '5px'
                                      }}></i>
                                      {new Date(catItem.check_in).toLocaleDateString('es-MX')}
                                    </div>
                                  ) : '—'}
                                </td>

                                {/* CHECK-OUT */}
                                <td className="stock">
                                  {catItem.check_out ? (
                                    <div>
                                      <i className="fi flaticon-calendar" style={{
                                        color: '#ff4d4f',
                                        marginRight: '5px'
                                      }}></i>
                                      {new Date(catItem.check_out).toLocaleDateString('es-MX')}
                                    </div>
                                  ) : '—'}
                                </td>

                                {/* NOCHES */}
                                <td className="stock">
                                  <span style={{
                                    background: '#f0f0f0',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    fontWeight: 'bold'
                                  }}>
                                    {catItem.nights || catItem.qty || 1} {(catItem.nights || catItem.qty) === 1 ? 'noche' : 'noches'}
                                  </span>
                                </td>

                                {/* PRECIO POR NOCHE */}
                                <td className="stock">
                                  ${catItem.price ? catItem.price.toLocaleString('es-MX') : '0'}
                                </td>

                                {/* TOTAL */}
                                <td className="stock">
                                  <strong style={{ color: '#52c41a', fontSize: '16px' }}>
                                    ${catItem.total_price ? catItem.total_price.toLocaleString('es-MX') : '0'}
                                  </strong>
                                </td>

                                {/* ACCIONES */}
                                <td className="action">
                                  <ul>
                                    <li
                                      className="w-btn"
                                      onClick={() => handleRemoveItem(catItem)}
                                      style={{ cursor: 'pointer' }}
                                      title="Eliminar del carrito"
                                    >
                                      <i className="fi ti-trash" style={{ color: '#ff4d4f' }}></i>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* BOTONES DE ACCIÓN */}
                      <div className="submit-btn-area" style={{ marginTop: '30px' }}>
                        <ul>
                          <li>
                            <Link
                              onClick={ClickHandler}
                              className="theme-btn"
                              to="/room"
                            >
                              <i className="fi flaticon-add"></i> Agregar Más Habitaciones
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* RESUMEN DEL CARRITO */}
                      <div className="cart-product-list" style={{ marginTop: '40px' }}>
                        <ul>
                          <li>
                            Total Habitaciones
                            <span style={{ fontWeight: 'bold', color: '#086AD8' }}>
                              {carts.length} {carts.length === 1 ? 'habitación' : 'habitaciones'}
                            </span>
                          </li>
                          <li>
                            Total de Noches
                            <span style={{ fontWeight: 'bold' }}>
                              {carts.reduce((sum, item) => sum + (item.nights || item.qty || 1), 0)} noches
                            </span>
                          </li>
                          <li>
                            Subtotal
                            <span>${totalPrice(carts).toLocaleString('es-MX')}</span>
                          </li>
                          <li>
                            IVA (16%)
                            <span>${(totalPrice(carts) * 0.16).toFixed(2)}</span>
                          </li>
                          <li>
                            Impuesto Ecológico
                            <span>$0.00</span>
                          </li>
                          <li className="cart-b">
                            Precio Total
                            <span style={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}>
                              ${(totalPrice(carts) * 1.16).toLocaleString('es-MX', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* BOTÓN DE CHECKOUT */}
                      <div className="submit-btn-area" style={{ marginTop: '30px' }}>
                        <ul>
                          <li>
                            <Link
                              onClick={ClickHandler}
                              className="theme-btn"
                              to="/checkout"
                              style={{
                                background: '#52c41a',
                                fontSize: '18px',
                                padding: '15px 40px'
                              }}
                            >
                              <i className="fi flaticon-credit-card"></i> Proceder al Pago
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    /* CARRITO VACÍO */
                    <div className="empty-cart text-center" style={{ padding: '80px 20px' }}>
                      <div style={{
                        fontSize: '100px',
                        color: '#ddd',
                        marginBottom: '30px',
                        animation: 'bounce 2s infinite'
                      }}>
                        <i className="fi flaticon-shopping-cart"></i>
                      </div>
                      <h2 style={{ marginBottom: '15px', color: '#333' }}>
                        Tu carrito está vacío
                      </h2>
                      <p style={{
                        marginBottom: '40px',
                        color: '#666',
                        fontSize: '16px',
                        maxWidth: '500px',
                        margin: '0 auto 40px'
                      }}>
                        ¡Agrega habitaciones increíbles a tu carrito y comienza a planear tu próxima aventura!
                      </p>
                      <Link
                        onClick={ClickHandler}
                        className="theme-btn"
                        to="/room"
                        style={{
                          fontSize: '18px',
                          padding: '15px 40px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <i className="fi flaticon-search"></i>
                        Explorar Habitaciones
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Scrollbar />

      {/* CSS para animación */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .cart-wrap {
          width: 100%;
          border-collapse: collapse;
        }
        
        .cart-wrap thead th {
          background: #f8f9fa;
          padding: 15px;
          font-weight: 600;
          border-bottom: 2px solid #dee2e6;
        }
        
        .cart-wrap tbody td {
          padding: 20px 15px;
          border-bottom: 1px solid #e9ecef;
          vertical-align: middle;
        }
        
        .cart-wrap tbody tr:hover {
          background: #f8f9fa;
          transition: all 0.3s ease;
        }
        
        .w-btn:hover i {
          transform: scale(1.2);
          transition: all 0.2s ease;
        }
      `}</style>
    </Fragment>
  );
};

// ========================================================
// MAPEO DE REDUX - CORREGIDO
// ========================================================
const mapStateToProps = (state) => {
  console.log('🔍 Redux State en CartPage:', state.cartList);

  return {
    // ✅ Cambiar de 'cart' a 'carts'
    carts: state.cartList?.carts || [],
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  loadUserCart,
})(CartPage);