import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import roomService from "../../api/roomService";
import blogs from '../../api/blogs'
import { Link } from 'react-router-dom'

const RoomSidebar = ({ roomTypeId }) => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ✅ Debug mejorado
    useEffect(() => {
        console.log('🏨 roomTypeId recibido en RoomSidebar:', roomTypeId);
        if (!roomTypeId) {
            console.error('❌ ERROR: roomTypeId es undefined');
        }
    }, [roomTypeId]);

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setError('');

        // ✅ Validar que roomTypeId exista antes de hacer la llamada
        if (!roomTypeId) {
            setError('Error: No se pudo identificar el tipo de habitación');
            console.error('❌ No se puede buscar sin roomTypeId');
            return;
        }

        setLoading(true);

        try {
            const checkIn = startDate.toISOString().split('T')[0];
            const checkOut = endDate.toISOString().split('T')[0];

            console.log('🔍 Datos de búsqueda:', {
                roomTypeId,
                checkIn,
                checkOut,
                adults,
                children
            });

            const response = await roomService.checkAvailability({
                checkIn,
                checkOut,
                adults,
                children,
                roomTypeId
            });

            console.log('✅ Respuesta del backend:', response);

            // ✅ Validar que venga data
            if (!response.data) {
                throw new Error('Respuesta inválida del servidor');
            }

            navigate('/search-result', {
                state: {
                    availabilityData: response.data,
                    searchParams: {
                        checkIn,
                        checkOut,
                        adults,
                        children,
                        roomTypeId
                    }
                }
            });

        } catch (err) {
            setError(err.message || 'Error al verificar disponibilidad');
            console.error('❌ Error:', err);
        } finally {
            setLoading(false);
        }
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-lg-4 col-12">
            <div className="blog-sidebar room-sidebar">
                <div className="widget check-widget">
                    <h3>Verificar Disponibilidad</h3>
                    <form onSubmit={SubmitHandler}>
                        <div className="input-group date">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                            />
                            <i className="fi flaticon-calendar"></i>
                        </div>

                        <div className="input-group date">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                            />
                            <i className="fi flaticon-calendar"></i>
                        </div>

                        <div className="input-group date">
                            <select
                                name="Adults"
                                id="Adults"
                                value={adults}
                                onChange={(e) => setAdults(Number(e.target.value))}
                            >
                                <option value="">Adultos</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="input-group date">
                            <select
                                name="Children"
                                id="Children"
                                value={children}
                                onChange={(e) => setChildren(Number(e.target.value))}
                            >
                                <option value="">Niños</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert" style={{ fontSize: '14px', padding: '10px', marginBottom: '10px' }}>
                                {error}
                            </div>
                        )}

                        <div className="input-group date">
                            <button
                                className="theme-btn"
                                type="submit"
                                disabled={loading || !roomTypeId}
                            >
                                {loading ? 'Verificando...' : 'Verificar Disponibilidad'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Resto del sidebar */}
                <div className="widget recent-post-widget">
                    <h3>Publicaciones Relacionadas</h3>
                    <div className="posts">
                        {blogs.map((blog, Bitem) => (
                            <div className="post" key={Bitem}>
                                <div className="img-holder">
                                    <img src={blog.screens} alt="" />
                                </div>
                                <div className="details">
                                    <h4><Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.title}</Link></h4>
                                    <span className="date">{blog.create_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomSidebar;