import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import CheckoutSection from '../../components/CheckoutSection';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { loadUserCart } from '../../store/actions/action';
import roomService from '../../api/roomService';
import { toast } from 'react-toastify';
import Logo from '../../images/logo2.png';

const CheckoutPage = ({ cartList, loadUserCart }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // ========================================================
    // 🔥 VERIFICAR AUTENTICACIÓN Y CARRITO
    // ========================================================
    useEffect(() => {
        const checkAuth = async () => {
            const user = authService.getCurrentUser();
            setCurrentUser(user);

            if (!user) {
                toast.warning('Debes iniciar sesión para continuar');
                navigate('/login');
                return;
            }

            try {
                console.log('👤 Usuario en Checkout:', user.id);

                // Cargar carrito del backend
                const cartData = await roomService.getCart();
                console.log('✅ Carrito cargado en Checkout:', cartData);

                // Actualizar Redux
                await loadUserCart(user.id, cartData);

                // Verificar que hay items en el carrito
                if (!cartData || cartData.length === 0) {
                    toast.warning('Tu carrito está vacío');
                    navigate('/cart');
                    return;
                }

            } catch (error) {
                console.error('❌ Error al cargar carrito:', error);
                toast.error('Error al cargar el carrito');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate, loadUserCart]);

    // ✅ Asegurar que cartList sea un array
    const carts = Array.isArray(cartList) ? cartList : [];

    console.log('🛒 Carrito en Checkout:', {
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
                <div className="checkout-area section-padding">
                    <div className="container">
                        <div className="text-center" style={{ padding: '100px 0' }}>
                            <div style={{ fontSize: '50px', color: '#086AD8', marginBottom: '20px' }}>
                                <i className="fi flaticon-loading"></i>
                            </div>
                            <h3>Cargando información...</h3>
                            <p style={{ color: '#666', marginTop: '10px' }}>
                                Preparando tu proceso de pago
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
    // SIN AUTENTICACIÓN O CARRITO VACÍO
    // ========================================================
    if (!currentUser || carts.length === 0) {
        return null; // Ya redirigió en el useEffect
    }

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Pago'} pagesub={'Pago'} />
            <CheckoutSection cartList={carts} />
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

// ========================================================
// MAPEO DE REDUX - CORREGIDO
// ========================================================
const mapStateToProps = state => {
    console.log('🔍 Redux State en Checkout:', state.cartList);

    return {
        // ✅ Cambiar de 'cart' a 'carts'
        cartList: state.cartList?.carts || [],
        symbol: state.data?.symbol || '$'
    };
};

export default connect(mapStateToProps, { loadUserCart })(CheckoutPage);