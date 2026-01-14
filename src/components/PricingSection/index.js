import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../../api/contentService';
import SectionTitleS2 from '../SectionTitleS2';
import PrImg1 from '../../images/pricing/1.jpg';
import PrImg2 from '../../images/pricing/2.jpg';
import PrImg3 from '../../images/pricing/3.jpg';

const defaultImages = [PrImg1, PrImg2, PrImg3];

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const PricingSection = (props) => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            // Obtener ofertas activas para la fecha actual
            const today = new Date().toISOString().split('T')[0];
            const response = await contentService.getOffers(today);

            if (response.success) {
                setOffers(response.data.items);
            }
        } catch (err) {
            setError('Error al cargar las ofertas');
            console.error('Error fetching offers:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <section className="wpo-pricing-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <SectionTitleS2 MainTitle={'Nuestras Ofertas Especiales'} />
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <p>Cargando ofertas...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="wpo-pricing-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <SectionTitleS2 MainTitle={'Nuestras Ofertas Especiales'} />
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <p className="text-danger">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="wpo-pricing-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <SectionTitleS2 MainTitle={'Nuestras Ofertas Especiales'} />
                    </div>
                </div>
                <div className="wpo-pricing-wrap">
                    <div className="row">
                        {offers.length > 0 ? (
                            offers.slice(0, 3).map((offer, index) => (
                                <div className="col col-lg-4 col-md-6 col-12" key={offer.id}>
                                    <div className="wpo-pricing-item">
                                        <div className="wpo-pricing-top">
                                            <div className="wpo-pricing-img">
                                                <img
                                                    src={offer.image_url || defaultImages[index % 3]}
                                                    alt={offer.title}
                                                    onError={(e) => {
                                                        e.target.src = defaultImages[index % 3];
                                                    }}
                                                />
                                            </div>
                                            <div className="wpo-pricing-text">
                                                <h4>{offer.title}</h4>
                                                {offer.price_from > 0 && (
                                                    <h2>
                                                        ${parseFloat(offer.price_from).toFixed(2)}
                                                        {offer.discount_percent > 0 && (
                                                            <span style={{
                                                                fontSize: '0.6em',
                                                                color: '#ff6b6b',
                                                                marginLeft: '10px',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                -{offer.discount_percent}% OFF
                                                            </span>
                                                        )}
                                                        <span>/Por Estancia</span>
                                                    </h2>
                                                )}
                                            </div>
                                        </div>
                                        <div className="wpo-pricing-bottom">
                                            <div className="wpo-pricing-bottom-text">
                                                <p style={{
                                                    minHeight: '80px',
                                                    marginBottom: '15px',
                                                    fontSize: '14px'
                                                }}>
                                                    {offer.description}
                                                </p>

                                                {(offer.start_date || offer.end_date) && (
                                                    <div style={{
                                                        marginBottom: '15px',
                                                        padding: '10px',
                                                        background: '#f8f9fa',
                                                        borderRadius: '5px',
                                                        fontSize: '13px'
                                                    }}>
                                                        <strong>Válido:</strong><br />
                                                        {offer.start_date && formatDate(offer.start_date)}
                                                        {offer.start_date && offer.end_date && ' al '}
                                                        {offer.end_date && formatDate(offer.end_date)}
                                                    </div>
                                                )}

                                                <Link
                                                    onClick={ClickHandler}
                                                    className="theme-btn"
                                                    to="/pricing"
                                                >
                                                    Reservar Ahora
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No hay ofertas disponibles en este momento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;