import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { addToCart } from "../../store/actions/action";
import { connect } from "react-redux";
import SearchRooms from '../../components/SearchRooms/SearchRooms';
import Scrollbar from '../../components/scrollbar';
import Logo from '../../images/logo2.png'
import Footer from '../../components/footer';

const SearchResults = ({ addToCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [availableRooms, setAvailableRooms] = useState([]);
    const [searchParams, setSearchParams] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ Verificar que vengan datos del formulario
        if (!location.state?.availabilityData) {
            // Si no hay datos, redirigir a la búsqueda
            navigate('/');
            return;
        }

        const { availabilityData, searchParams: params } = location.state;

        // ✅ Mapear datos del backend al formato del frontend
        const mappedRooms = availabilityData.results.map(room => ({
            id: room.room_id,  // ID de la habitación física
            room_number: room.room_number,
            floor: room.floor,
            title: room.room_type,
            room_type_id: room.room_type_id,
            price: room.price_per_night,
            total_price: room.total_price,
            nights: room.nights,
            capacity: availabilityData.adults,
            Children: availabilityData.children,
            amenities: room.amenities || [],
            cancellation_policy: room.cancellation_policy,
            // ✅ Aquí deberías mapear las imágenes reales del backend
            proImg: require('../../images/destination/1.jpg'), // Temporal
        }));

        setAvailableRooms(mappedRooms);
        setSearchParams(params);
        setLoading(false);
    }, [location.state, navigate]);

    const addToCartProduct = (product, qty = 1) => {
        // ✅ Agregar información de búsqueda al producto para Redux
        const productWithDates = {
            ...product,
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
            adults: searchParams.adults,
            children: searchParams.children,
        };
        addToCart(productWithDates, qty);
    };

    // Función para formatear fechas
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <Fragment>
                <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
                <div className="loading-container">
                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                    <p>Cargando habitaciones disponibles...</p>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Habitaciones Disponibles'} pagesub={'Disponibilidad'} />

            <section className="wpo-shop-page">
                <div className="container">
                    {/* ✅ Banner de información de búsqueda */}
                    {searchParams.checkIn && (
                        <div className="search-info-banner">
                            <div className="banner-left">
                                <h5>
                                    <i className="fa fa-search"></i> Resultados de búsqueda
                                </h5>
                                <div className="search-details">
                                    <span className="detail-item">
                                        <strong>Fechas:</strong> {formatDate(searchParams.checkIn)} → {formatDate(searchParams.checkOut)}
                                    </span>
                                    <span className="detail-separator">|</span>
                                    <span className="detail-item">
                                        <strong>Huéspedes:</strong> {searchParams.adults} adulto(s), {searchParams.children} niño(s)
                                    </span>
                                </div>
                            </div>
                            <div className="banner-right">
                                <button
                                    className="change-search-btn"
                                    onClick={() => navigate(-1)}
                                >
                                    <i className="fa fa-arrow-left"></i> Cambiar búsqueda
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ✅ Contenido principal */}
                    <div className="row">
                        <div className="col-lg-12">
                            {availableRooms.length > 0 ? (
                                <>
                                    {/* ✅ Contador de resultados */}
                                    <div className="results-count">
                                        <p>
                                            Se encontraron <strong>{availableRooms.length}</strong> habitaciones disponibles
                                        </p>
                                    </div>

                                    {/* ✅ Grid de habitaciones */}
                                    <SearchRooms
                                        addToCartProduct={addToCartProduct}
                                        products={availableRooms}
                                        searchParams={searchParams}
                                    />
                                </>
                            ) : (
                                /* ✅ Sin resultados */
                                <div className="no-results-container">
                                    <div className="alert">
                                        <i className="fa fa-exclamation-triangle fa-3x"></i>
                                        <h4>No hay habitaciones disponibles</h4>
                                        <p>
                                            Lo sentimos, no hay habitaciones disponibles para las fechas
                                            y capacidad seleccionadas. Por favor, intenta con otras fechas
                                            o reduce el número de huéspedes.
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(-1)}
                                        >
                                            <i className="fa fa-calendar"></i> Intentar con otras fechas
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default connect(null, { addToCart })(SearchResults);