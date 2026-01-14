import React from 'react'
import { Link } from 'react-router-dom'
import abimg from '../../images/about.jpg'

const About2 = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="wpo-about-section section-padding">
            <div className="container">
                <div className="wpo-about-section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-img">
                                <img src={abimg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-content">
                                <div className="about-title">
                                    <span>Oferta exclusiva</span>
                                    <h2>Disfruta de tus vacaciones reservando con nosotros</h2>
                                </div>
                                <div className="wpo-about-content-inner">
                                    <p>Disfruta de tu estancia en el balneario de la mejor manera, en nuestros espacios que son diseñados para ti y tu familia</p>
                                    <div className="about-info-wrap">
                                        <div className="about-info-left">
                                            <p>2 Dias / 3 Noches</p>
                                            <ul>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><span><i className="fa fa-star" aria-hidden="true"></i></span></li>
                                            </ul>
                                        </div>
                                        <div className="about-info-right">
                                            <p>A solo</p>
                                            <h3>$2500</h3>
                                        </div>
                                    </div>
                                    <Link className="theme-btn" onClick={ClickHandler} to='/room'>Reservar ahora</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About2;