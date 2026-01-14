import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import MobileMenu from "../MobileMenu";
import { removeFromCart, loadUserCart } from "../../store/actions/action";
import { Link, useNavigate } from 'react-router-dom'
import HeaderTopbar from "../HeaderTopbar";
import { totalPrice } from "../../utils";
import { authService } from '../../api/authService';
import roomService from '../../api/roomService';
import { toast } from "react-toastify";
import shape from "../../images/hotel.png"

const Header = (props) => {
  const navigate = useNavigate();
  const [menuActive, setMenuState] = useState(false);
  const [cartActive, setcartState] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ========================================================
  // 🔥 VERIFICAR AUTENTICACIÓN Y CARGAR CARRITO
  // ========================================================
  useEffect(() => {
    const checkAuth = async () => {
      const user = authService.getCurrentUser();
      setCurrentUser(user);

      // Si hay usuario, cargar el carrito del backend
      if (user) {
        try {
          console.log('🔄 Header: Cargando carrito para:', user.id);
          const cartData = await roomService.getCart();

          console.log('📦 Respuesta del backend (raw):', cartData);

          // Extraer el array de items
          let cartItems = [];
          if (Array.isArray(cartData)) {
            cartItems = cartData;
          } else if (cartData.data && Array.isArray(cartData.data)) {
            cartItems = cartData.data;
          } else if (cartData.cart && Array.isArray(cartData.cart)) {
            cartItems = cartData.cart;
          } else if (cartData.items && Array.isArray(cartData.items)) {
            cartItems = cartData.items;
          }

          console.log('✅ Header: Items extraídos del carrito:', {
            cantidad: cartItems.length,
            items: cartItems
          });

          // ✅ Pasar AMBOS parámetros: userId Y cartItems
          await props.loadUserCart(user.id, cartItems);

        } catch (error) {
          console.error('❌ Error al cargar carrito:', error);
          // Si hay error, cargar carrito vacío
          await props.loadUserCart(user.id, []);
        }
      } else {
        // Si no hay usuario, limpiar carrito
        await props.loadUserCart(null, []);
      }
    };

    // Verificar al montar el componente
    checkAuth();

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault()
  }

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  // ========================================================
  // 🔥 LOGOUT CON LIMPIEZA DE CARRITO
  // ========================================================
  const handleLogout = async () => {
    try {
      console.log('🚪 Cerrando sesión desde Header...');

      // 1. Cerrar sesión en el backend
      await authService.logout();

      // 2. Limpiar el carrito de Redux
      props.loadUserCart(null, []);

      // 3. Actualizar estado local
      setCurrentUser(null);
      setUserMenuActive(false);

      console.log('✅ Sesión cerrada y carrito limpiado');
      toast.success('Sesión cerrada correctamente');

      // 4. Redirigir al home
      navigate('/home');

    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);

      // Aún así limpiar el estado local y Redux
      props.loadUserCart(null, []);
      setCurrentUser(null);
      setUserMenuActive(false);

      toast.success('Sesión cerrada correctamente');
      navigate('/home');
    }
  }

  const toggleUserMenu = (e) => {
    e.preventDefault();
    setUserMenuActive(!userMenuActive);
  }

  // ✅ Asegurar que carts siempre sea un array
  const carts = Array.isArray(props.carts) ? props.carts : [];

  return (
    <header id="header" className={props.topbarBlock}>
      <HeaderTopbar />
      <div className={`wpo-site-header ${props.hclass}`}>
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu />
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="navbar-header">
                  <Link onClick={ClickHandler} className="navbar-brand logo" to="/home">
                    <img src={props.Logo} alt="" style={{ maxWidth: '110px', height: 'auto' }} />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-1 col-1">
                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                  <button className="menu-close"><i className="ti-close"></i></button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link to="/home">Inicio</Link>
                    </li>
                    <li><Link onClick={ClickHandler} to="/about">Sobre nosotros</Link></li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="/room">Habitaciones</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="/blog">Blog</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="/service">Servicios</Link>
                    </li>
                    <li><Link onClick={ClickHandler} to="/contact">Contacto</Link></li>

                    {!currentUser ? (
                      <>
                        <li className="menu-item-has-children">
                          <Link onClick={ClickHandler} to="/login">
                            <i className="fi flaticon-user"></i>
                            <span>Iniciar sesión</span>
                          </Link>
                        </li>
                        <li className="menu-item-has-children">
                          <Link onClick={ClickHandler} to="/register">
                            <i className="fi flaticon-edit"></i>
                            <span>Registrarse</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="menu-item-has-children user-menu">
                        <a
                          href="#"
                          onClick={toggleUserMenu}
                          className={userMenuActive ? 'rotate' : ''}
                        >
                          <i className="fi flaticon-user"></i> {currentUser.name}
                        </a>
                        <ul className={`sub-menu ${userMenuActive ? 'active' : ''}`}>
                          <li>
                            <Link onClick={ClickHandler} to="/profile">
                              <i className="fi flaticon-user"></i> Mi Perfil
                            </Link>
                          </li>
                          <li>
                            <Link onClick={ClickHandler} to="/my-bookings">
                              <i className="fi flaticon-calendar"></i> Mis Reservas
                            </Link>
                          </li>
                          {currentUser.role === 'admin' && (
                            <li>
                              <Link onClick={ClickHandler} to="/admin-dashboard">
                                <i className="fi flaticon-dashboard"></i> Panel Admin
                              </Link>
                            </li>
                          )}
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                              }}
                              style={{ color: '#ff4d4f' }}
                            >
                              <i className="fi flaticon-logout"></i> Cerrar Sesión
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-lg-1 col-md-2 col-2">
                <div className="header-right">
                  {currentUser && (
                    <>
                      <div className="header-search-form-wrapper">
                        <div className="cart-search-contact">
                          <button onClick={() => setMenuState(!menuActive)} className="search-toggle-btn">
                            <i className={`fi ${menuActive ? "ti-close" : "fi flaticon-search"}`}></i>
                          </button>
                          <div className={`header-search-form ${menuActive ? "header-search-content-toggle" : ""}`}>
                            <form onSubmit={SubmitHandler}>
                              <div>
                                <input type="text" className="form-control" placeholder="Buscar aquí..." />
                                <button type="submit">
                                  <i className="fi flaticon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="mini-cart">
                        <button className="cart-toggle-btn" onClick={() => setcartState(!cartActive)}>
                          <i className="fi flaticon-shopping-cart"></i>
                          {carts.length > 0 && (
                            <span className="cart-count">{carts.length}</span>
                          )}
                        </button>
                        <div className={`mini-cart-content ${cartActive ? "mini-cart-content-toggle" : ""}`}>
                          <button className="mini-cart-close" onClick={() => setcartState(!cartActive)}>
                            <i className="ti-close"></i>
                          </button>

                          {carts.length === 0 ? (
                            <div className="mini-cart-empty" style={{
                              padding: '40px 20px',
                              textAlign: 'center',
                              color: '#999'
                            }}>
                              <i className="fi flaticon-shopping-cart" style={{
                                fontSize: '48px',
                                marginBottom: '15px',
                                display: 'block'
                              }}></i>
                              <p>Tu carrito está vacío</p>
                              <Link
                                onClick={() => { ClickHandler(); setcartState(false); }}
                                to="/room"
                                className="view-cart-btn"
                                style={{ marginTop: '15px' }}
                              >
                                Ver Habitaciones
                              </Link>
                            </div>
                          ) : (
                            <>
                              <div className="mini-cart-items">
                                {carts.map((catItem, crt) => (
                                  <div className="mini-cart-item clearfix" key={crt}>
                                    <div className="mini-cart-item-image">
                                      <span>
                                        <img src={catItem.proImg} alt="icon" />
                                      </span>
                                    </div>
                                    <div className="mini-cart-item-des">
                                      <p>{catItem.title}</p>
                                      {catItem.room_number && (
                                        <small style={{ color: '#666' }}>
                                          Hab. {catItem.room_number}
                                        </small>
                                      )}
                                      <span className="mini-cart-item-price">
                                        ${catItem.price} x {catItem.qty} {catItem.qty === 1 ? 'noche' : 'noches'}
                                      </span>
                                      <span className="mini-cart-item-quantity">
                                        <button
                                          onClick={() => props.removeFromCart(catItem.id)}
                                          className="btn btn-sm btn-danger"
                                        >
                                          <i className="ti-close"></i>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mini-cart-action clearfix">
                                <span className="mini-checkout-price">
                                  Subtotal: <span>${totalPrice(carts)}</span>
                                </span>
                                <div className="mini-btn">
                                  <Link
                                    onClick={() => { ClickHandler(); setcartState(false); }}
                                    to="/checkout"
                                    className="view-cart-btn s1"
                                  >
                                    Pagar
                                  </Link>
                                  <Link
                                    onClick={() => { ClickHandler(); setcartState(false); }}
                                    to="/cart"
                                    className="view-cart-btn"
                                  >
                                    Ver carrito
                                  </Link>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="visible-icon">
                            <img src={shape} alt="icon" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

// ========================================================
// 🔥 MAPEO DE REDUX - CORREGIDO FINAL
// ========================================================
const mapStateToProps = (state) => {
  console.log('🔍 Redux State en Header:', {
    cartList: state.cartList,
    carts: state.cartList?.carts,
    currentUserId: state.cartList?.currentUserId
  });

  return {
    carts: state.cartList?.carts || []
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  loadUserCart
})(Header);