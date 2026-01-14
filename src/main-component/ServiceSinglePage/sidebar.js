import React from 'react'
import Destinations from '../../api/habitaciones'
import { Link } from 'react-router-dom'
import ins1 from '../../images/instragram/1.jpg'
import ins2 from '../../images/instragram/2.jpg'
import ins3 from '../../images/instragram/3.jpg'
import ins4 from '../../images/instragram/4.jpg'
import ins5 from '../../images/instragram/5.jpg'
import ins6 from '../../images/instragram/6.jpg'

const ServiceSidebar = (props) => {

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-lg-4 col-md-8">
            <div className="wpo-single-sidebar">

                <div className="wpo-newsletter-widget widget">
                    <h2>Boletín Informativo</h2>
                    <p>¡Únete a nuestros suscriptores!</p>
                    <form className="form" onSubmit={SubmitHandler}>
                        <input type="text" placeholder="Dirección de Email" />
                        <button type="submit">Suscribirse</button>
                    </form>
                    <span>Al suscribirte aceptas nuestra <Link onClick={ClickHandler} to="/service-single/1">Política de Privacidad</Link></span>
                </div>
                <div className="wpo-instagram-widget widget">
                    <h2>Galería de Instagram</h2>

                    <ul>
                        <li><img src={ins1} alt="" /></li>
                        <li><img src={ins2} alt="" /></li>
                        <li><img src={ins3} alt="" /></li>
                        <li><img src={ins4} alt="" /></li>
                        <li><img src={ins5} alt="" /></li>
                        <li><img src={ins6} alt="" /></li>
                    </ul>
                </div>

                <div className="wpo-contact-widget widget">
                    <h2>¿Cómo Podemos <br /> Ayudarte!</h2>
                    <p>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                        viverra maecenas accumsan lacus vel facilisis. </p>
                    <Link onClick={ClickHandler} to="/contact">Contáctanos</Link>
                </div>
            </div>
        </div>

    )
}

export default ServiceSidebar;