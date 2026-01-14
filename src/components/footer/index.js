import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.png'
import Services from '../../api/service'


const Footer = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src={Logo} alt="footer" />
                                </div>
                                <p>La consultoría de gestión incluye una amplia gama de actividades, y las numerosas empresas y sus miembros a menudo definen estas prácticas.</p>
                                <ul>
                                    <li>
                                        <Link onClick={ClickHandler} to="/">
                                            <i className="ti-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} to="/">
                                            <i className="ti-twitter-alt"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} to="/">
                                            <i className="ti-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} to="/">
                                            <i className="ti-google"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget s1">
                                <div className="widget-title">
                                    <h3>Servicios</h3>
                                </div>
                                <ul>
                                    {Services.slice(0, 5).map((service, sitem) => (
                                        <li key={sitem}><Link onClick={ClickHandler} to={`/service-single/${service.id}`}>{service.title}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Enlaces Importantes</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} to="/about">Nosotros</Link></li>
                                    <li><Link onClick={ClickHandler} to="/room">Habitaciones Increíbles</Link></li>
                                    <li><Link onClick={ClickHandler} to="/service">Nuestros Servicios</Link></li>
                                    <li><Link onClick={ClickHandler} to="/pricing">Planes de Precios</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget wpo-service-link-widget">
                                <div className="widget-title">
                                    <h3>Contacto</h3>
                                </div>
                                <div className="contact-ft">
                                    <ul>
                                        <li><i className="fi flaticon-placeholder"></i>Carr. México Laredo KM 156 / Col. Dios Padre CP 42300 / Ixmiquilpan, Hidalgo</li>
                                        <li><i className="fi flaticon-phone-call"></i> 01 (759) 72 3 83 71</li>
                                        <li><i className="fi flaticon-send"></i>reservaciones@hoteldiospadre.com.mx</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className="copyright"> Copyright &copy; 2022 Parador by <Link onClick={ClickHandler} to="/">wpOceans</Link>.
                                Todos los Derechos Reservados.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;