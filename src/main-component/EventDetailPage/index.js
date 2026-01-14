import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contentService } from '../../api/contentService';

const EventDetailPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            const response = await contentService.getEvent(id);

            if (response.success) {
                setEvent(response.data);
            }
        } catch (err) {
            setError('Error al cargar el evento');
            console.error('Error fetching event:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
            <section className="wpo-blog-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="text-center py-5">
                                <p>Cargando evento...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !event) {
        return (
            <section className="wpo-blog-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="text-center py-5">
                                <p className="text-danger">{error || 'Evento no encontrado'}</p>
                                <Link to="/" className="theme-btn mt-3">Volver al inicio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="wpo-blog-single-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="wpo-blog-content">
                            {event.image_url && (
                                <div className="post-media" style={{ marginBottom: '30px' }}>
                                    <img
                                        src={event.image_url}
                                        alt={event.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>
                            )}

                            <div className="post-title" style={{ marginBottom: '30px' }}>
                                <h2>{event.title}</h2>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                marginBottom: '30px',
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '8px'
                            }}>
                                {event.start_date && (
                                    <div style={{ flex: '1 1 200px' }}>
                                        <i className="fa fa-calendar" style={{ marginRight: '10px', color: '#c99e6e' }}></i>
                                        <strong>Fecha:</strong><br />
                                        <span>{formatDate(event.start_date)}</span>
                                    </div>
                                )}

                                {(event.start_date || event.end_date) && (
                                    <div style={{ flex: '1 1 200px' }}>
                                        <i className="fa fa-clock-o" style={{ marginRight: '10px', color: '#c99e6e' }}></i>
                                        <strong>Horario:</strong><br />
                                        <span>
                                            {event.start_date && formatTime(event.start_date)}
                                            {event.start_date && event.end_date && ' - '}
                                            {event.end_date && formatTime(event.end_date)}
                                        </span>
                                    </div>
                                )}

                                {event.location && (
                                    <div style={{ flex: '1 1 200px' }}>
                                        <i className="fa fa-map-marker" style={{ marginRight: '10px', color: '#c99e6e' }}></i>
                                        <strong>Ubicación:</strong><br />
                                        <span>{event.location}</span>
                                    </div>
                                )}
                            </div>

                            <div className="post-body" style={{ lineHeight: '1.8' }}>
                                <p>{event.description}</p>
                            </div>

                            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                <Link
                                    to="/"
                                    className="theme-btn"
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetailPage;