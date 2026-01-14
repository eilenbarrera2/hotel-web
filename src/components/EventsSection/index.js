import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../../api/contentService';
import SectionTitleS2 from '../SectionTitleS2';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const EventsSection = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await contentService.getEvents();

            if (response.success) {
                setEvents(response.data.items);
            }
        } catch (err) {
            setError('Error al cargar los eventos');
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('es-MX', options);
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('es-MX', { month: 'short' });
        return { day, month };
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <section className="wpo-pricing-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <SectionTitleS2 MainTitle={'Próximos Eventos'} />
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <p>Cargando eventos...</p>
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
                            <SectionTitleS2 MainTitle={'Próximos Eventos'} />
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <p className="text-danger">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (events.length === 0) {
        return null;
    }

    return (
        <section className="wpo-pricing-section section-padding" style={{ background: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <SectionTitleS2 MainTitle={'Próximos Eventos'} />
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>
                            Te invitamos a que vivas una gran experiencia en nuestro hotel.
                            <br />¡Una experiencia de la que no te arrepentirás!
                        </p>
                    </div>
                </div>
                <div className="wpo-pricing-wrap">
                    <div className="row">
                        {events.slice(0, 3).map((event, index) => {
                            const dateInfo = event.start_date ? formatShortDate(event.start_date) : null;

                            return (
                                <div className="col col-lg-4 col-md-6 col-12" key={event.id}>
                                    <div className="wpo-pricing-item">
                                        <div className="wpo-pricing-top">
                                            <div className="wpo-pricing-img" style={{ position: 'relative' }}>
                                                {event.image_url ? (
                                                    <img
                                                        src={event.image_url}
                                                        alt={event.title}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.style.minHeight = '250px';
                                                            e.target.parentElement.style.background = '#e9ecef';
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        minHeight: '250px',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <i className="fi flaticon-calendar" style={{
                                                            fontSize: '80px',
                                                            color: 'rgba(255,255,255,0.3)'
                                                        }}></i>
                                                    </div>
                                                )}

                                                {/* Badge de fecha */}
                                                {dateInfo && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '20px',
                                                        left: '20px',
                                                        background: 'white',
                                                        padding: '10px 15px',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                        textAlign: 'center',
                                                        minWidth: '70px'
                                                    }}>
                                                        <div style={{
                                                            fontSize: '24px',
                                                            fontWeight: 'bold',
                                                            color: '#c99e6e',
                                                            lineHeight: '1'
                                                        }}>
                                                            {dateInfo.day}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            textTransform: 'uppercase',
                                                            marginTop: '5px'
                                                        }}>
                                                            {dateInfo.month}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Badge de ubicación */}
                                                {event.location && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '20px',
                                                        right: '20px',
                                                        background: 'rgba(0,0,0,0.7)',
                                                        color: 'white',
                                                        padding: '8px 15px',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}>
                                                        <i className="fi flaticon-location-1"></i>
                                                        {event.location}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="wpo-pricing-text">
                                                <h4 style={{
                                                    minHeight: '50px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                    {event.title}
                                                </h4>

                                                {/* Información de horario */}
                                                {(event.start_date || event.end_date) && (
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        color: '#666',
                                                        fontSize: '14px',
                                                        marginBottom: '10px'
                                                    }}>
                                                        <i className="fi flaticon-clock"></i>
                                                        <span>
                                                            {event.start_date && formatTime(event.start_date)}
                                                            {event.start_date && event.end_date && ' - '}
                                                            {event.end_date && formatTime(event.end_date)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="wpo-pricing-bottom">
                                            <div className="wpo-pricing-bottom-text">
                                                <p style={{
                                                    minHeight: '80px',
                                                    marginBottom: '20px',
                                                    fontSize: '14px',
                                                    lineHeight: '1.6',
                                                    color: '#666'
                                                }}>
                                                    {event.description && event.description.length > 120
                                                        ? event.description.substring(0, 120) + '...'
                                                        : event.description}
                                                </p>

                                                {/* Fecha completa al fondo */}
                                                {event.start_date && (
                                                    <div style={{
                                                        marginBottom: '15px',
                                                        padding: '10px',
                                                        background: '#f8f9fa',
                                                        borderRadius: '5px',
                                                        fontSize: '13px',
                                                        textAlign: 'center'
                                                    }}>
                                                        <i className="fi flaticon-calendar" style={{ marginRight: '8px', color: '#c99e6e' }}></i>
                                                        {formatDate(event.start_date)}
                                                    </div>
                                                )}

                                                <Link
                                                    onClick={ClickHandler}
                                                    to={`/event/${event.id}`}
                                                    className="theme-btn"
                                                >
                                                    Ver Detalles
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;