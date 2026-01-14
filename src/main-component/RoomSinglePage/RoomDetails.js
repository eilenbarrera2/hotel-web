import React from 'react'
import { Link } from 'react-router-dom'
import simg1 from '../../images/room/img-7.jpg'
import simg2 from '../../images/room/img-8.jpg'
import rv1 from '../../images/room/r1.jpg'
import rv2 from '../../images/room/r2.jpg'

// Datos de las habitaciones
const roomData = {
    1: {
        title: "Habitación Sencilla",
        price: "$1,910.00",
        description: [
            "Nuestra habitación sencilla ofrece un espacio acogedor y funcional, ideal para viajeros que buscan comodidad y privacidad. Decorada con colores cálidos y mobiliario clásico, cuenta con todo lo necesario para una estancia placentera.",
            "Perfecta para una o dos personas que desean disfrutar de un descanso tranquilo en un ambiente íntimo. El diseño cálido con acabados en madera crea una atmósfera acogedora para tu estancia.",
            "Todas nuestras habitaciones cuentan con limpieza diaria, servicio de recepción 24 horas y acceso a las áreas comunes del hotel."
        ],
        amenities: [
            "Repisa y/o closet",
            "1 cama matrimonial (1.90 x 1.35)",
            "TV de 32\" con servicio de cable",
            "Baño con regadera y agua caliente",
            "Aire acondicionado",
            "WiFi gratuito",
            "Cortinas blackout"
        ],
        services: [
            "Limpieza diaria",
            "Toallas y ropa de cama limpias",
            "Artículos de tocador básicos",
            "Servicio de recepción 24 horas",
            "Estacionamiento gratuito",
            "Acceso a áreas comunes",
            "Caja de seguridad"
        ]
    },
    2: {
        title: "Habitación Doble",
        price: "$3,300.00",
        description: [
            "Espaciosa y confortable, nuestra habitación doble es perfecta para parejas o amigos que viajan juntos. Con dos camas matrimoniales amplias y un ambiente acogedor, ofrece el equilibrio ideal entre espacio personal y convivencia.",
            "El diseño cálido con tonos naranjas y acabados en madera crea una atmósfera acogedora para tu estancia. Incluye balcón privado para disfrutar de momentos de relajación.",
            "En temporada vacacional, días festivos y puentes no aplica ningún descuento."
        ],
        amenities: [
            "Repisa y/o closet espacioso",
            "2 camas matrimoniales (1.90 x 1.35)",
            "TV de 32\" con servicio de cable",
            "Baño con regadera y agua caliente",
            "Balcón privado",
            "Aire acondicionado",
            "WiFi de alta velocidad"
        ],
        services: [
            "Limpieza diaria profesional",
            "Cambio de toallas y sábanas",
            "Amenidades de baño",
            "Servicio a la habitación",
            "Caja de seguridad",
            "Estacionamiento gratuito",
            "Acceso a instalaciones"
        ]
    },
    3: {
        title: "Habitación Triple",
        price: "$4,560.00",
        description: [
            "Diseñada para grupos pequeños o familias, nuestra habitación triple combina funcionalidad y comodidad. Con tres camas matrimoniales independientes, cada huésped disfruta de su propio espacio de descanso.",
            "Los pisos de cerámica y la decoración en tonos cálidos crean un ambiente acogedor y fácil de mantener fresco durante tu estancia.",
            "En temporada vacacional, días festivos y puentes no aplica ningún descuento."
        ],
        amenities: [
            "Repisa y/o closet amplio",
            "3 camas matrimoniales (1.90 x 1.35)",
            "TV de 32\" con servicio de cable",
            "Baño con regadera y agua caliente",
            "Aire acondicionado de alta capacidad",
            "Espacio generoso para equipaje",
            "WiFi gratuito"
        ],
        services: [
            "Limpieza diaria exhaustiva",
            "Toallas para cada huésped",
            "Artículos de higiene personal",
            "Servicio de despertador",
            "Atención personalizada",
            "Estacionamiento incluido",
            "Acceso a todas las instalaciones"
        ]
    },
    4: {
        title: "Habitación Familiar",
        price: "$3,440.00",
        description: [
            "Nuestra habitación familiar está especialmente pensada para quienes viajan en grupo o con familia. Cuenta con dos recámaras independientes con cama queen, además de una sala de estar con sillón para 3 personas.",
            "Incluye un recibidor equipado con mesa para 4 personas. Este espacio versátil permite momentos de convivencia y también de privacidad, siendo la opción perfecta para estancias prolongadas.",
            "En temporada vacacional, días festivos y puentes no aplica ningún descuento."
        ],
        amenities: [
            "Buró y closet en ambas recámaras",
            "2 recámaras con cama Queen (1.90 x 1.55)",
            "Recibidor con mesa para 4 personas",
            "Sillón para 3 personas",
            "TV de 32\" con servicio de cable",
            "Baño con regadera y agua caliente",
            "Aire acondicionado en toda la unidad"
        ],
        services: [
            "Limpieza diaria completa",
            "Cambio de ropa de cama y toallas",
            "Amenidades premium de baño",
            "Servicio de alimentos (previa solicitud)",
            "Asistencia personalizada",
            "Estacionamiento gratuito",
            "Acceso completo a instalaciones"
        ]
    }
}

const RoomDetails = ({ roomId }) => {
    // ✅ Usar el roomId que viene desde props
    const room = roomData[roomId] || roomData[1];

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-lg-8 col-12">
            <div className="room-description">
                <div className="room-title">
                    <h2>Descripción</h2>
                </div>
                {room.description.map((paragraph, index) => (
                    <p key={index} className={index === 0 ? "p-wrap" : ""}>
                        {paragraph}
                    </p>
                ))}
            </div>
            <div className="room-details-service">
                <div className="row">
                    <div className="room-details-item">
                        <div className="row">
                            <div className="col-md-5 col-sm-5">
                                <div className="room-d-text">
                                    <div className="room-title">
                                        <h2>Comodidades</h2>
                                    </div>
                                    <ul>
                                        {room.amenities.map((amenity, index) => (
                                            <li key={index}>
                                                <Link onClick={ClickHandler} to={`/room-single/${roomId}`}>
                                                    {amenity}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-7">
                                <div className="room-d-img">
                                    <img src={simg1} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-7">
                                <div className="room-d-img">
                                    <img src={simg2} alt="" />
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-5">
                                <div className="room-d-text2">
                                    <div className="room-title">
                                        <h2>Servicios de la habitación</h2>
                                    </div>
                                    <ul>
                                        {room.services.map((service, index) => (
                                            <li key={index}>
                                                <Link onClick={ClickHandler} to={`/room-single/${roomId}`}>
                                                    {service}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pricing-area">
                <div className="room-title">
                    <h2>Planes de precios</h2>
                </div>
                <div className="pricing-table">
                    <table className="table-responsive pricing-wrap">
                        <thead>
                            <tr>
                                <th>Lun</th>
                                <th>Mar</th>
                                <th>Mié</th>
                                <th>Jue</th>
                                <th>Vie</th>
                                <th>Sáb</th>
                                <th>Dom</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                                <td>{room.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="map-area">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4740.772574523826!2d-99.19968508829167!3d20.460919480971114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3dffb946d06a7%3A0x6be0b90a9394d3ef!2sHotel%20Dios%20Padre!5e1!3m2!1ses-419!2smx!4v1759346866440!5m2!1ses-419!2smx"
                        title="Hotel Dios Padre Location"
                    ></iframe>
                </div>
            </div>
            <div className="room-review">
                <div className="room-title">
                    <h2>Reseñas de la habitación</h2>
                </div>
                <div className="review-item">
                    <div className="review-img">
                        <img src={rv1} alt="" />
                    </div>
                    <div className="review-text">
                        <div className="r-title">
                            <h2>Marry Watson</h2>
                            <ul>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                            </ul>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    </div>
                </div>
                <div className="review-item">
                    <div className="review-img">
                        <img src={rv2} alt="" />
                    </div>
                    <div className="review-text">
                        <div className="r-title">
                            <h2>Lily Havenly</h2>
                            <ul>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                            </ul>
                        </div>
                        <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    </div>
                </div>
            </div>
            <div className="add-review">
                <div className="room-title">
                    <h2>Agregar reseña</h2>
                </div>
                <div className="wpo-blog-single-section review-form ">
                    <div className="give-rat-sec">
                        <p>Tu calificación *</p>
                        <div className="give-rating">
                            <label>
                                <input type="radio" name="stars" value="1" />
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="stars" value="2" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="stars" value="3" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="stars" value="4" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="stars" value="5" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                        </div>
                    </div>
                    <div className="review-add">
                        <div className="comment-respond">
                            <form id="commentform" className="comment-form" onSubmit={SubmitHandler}>
                                <div className="form-inputs">
                                    <input placeholder="Tu nombre*" type="text" />
                                    <input placeholder="Tu email*" type="email" />
                                </div>
                                <div className="form-textarea">
                                    <textarea id="comment" placeholder="Tu reseña"></textarea>
                                </div>
                                <div className="form-check">
                                    <div className="shipp pb">
                                        <input type="checkbox" id="c2" name="cc" />
                                        <label htmlFor="c2"><span></span>Guardar mi nombre, email y sitio web en este navegador para la próxima vez que comente.</label>
                                    </div>
                                </div>
                                <div className="form-submit">
                                    <input id="submit" value="Enviar ahora" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;