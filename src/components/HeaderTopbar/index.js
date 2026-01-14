import React from 'react'
import { Link } from 'react-router-dom'

const HeaderTopbar = () => {
    return (
        <div className="topbar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-7 col-md-8 col-sm-12 col-12">
                        <div className="contact-intro">
                            <ul>
                                <li><i className="fi flaticon-email"></i> reservaciones@hoteldiospadre.com.mx</li>
                                <li><i className="fi flaticon-phone-call"></i> 01 (759) 72 3 83 71</li>
                                <li><i className="fi ti-location-pin"></i>  Carr. México Laredo KM 156 / Col. Dios Padre CP 42300 / Ixmiquilpan, Hidalgo</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-5 col-md-4 col-sm-12 col-12">
                        <div className="contact-info">
                            <ul>

                                <li><Link to="/"><i className="fi flaticon-facebook-app-symbol"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-twitter"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-linkedin"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-instagram"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-pinterest"></i></Link></li>
                                <li><Link to="/"><i className="fi flaticon-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTopbar;