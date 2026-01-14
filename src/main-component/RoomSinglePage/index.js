import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import api from "../../api";
import Footer from '../../components/footer';
import Logo from '../../images/logo2.png'
import Rooms from './rooms';
import RoomDetails from './RoomDetails';
import RoomSidebar from './RoomSidebar';

const RoomSinglePage = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null);  // ✅ Cambiar de {} a null

    useEffect(() => {
        const productsArray = api();
        const foundItem = productsArray.find(product => product.id === Number(id));

        if (foundItem) {
            console.log('✅ Item cargado:', foundItem);
            console.log('✅ item.id:', foundItem.id);
            setItem(foundItem);
        }
    }, [id]);

    // ✅ No renderizar nada hasta que item esté cargado
    if (!item) {
        return (
            <Fragment>
                <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
                <div className="loading-container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px'
                }}>
                    <p>Cargando...</p>
                </div>
                <Footer />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={item.title} pagesub={'Habitación'} />
            <div className="room-details-section">
                <div className="room-details-inner">
                    <div className="wpo-hotel-details-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="wpo-hotel-details-wrap">
                                        <div className="wpo-hotel-details-area">
                                            <form className="clearfix">
                                                <div className="details-sub">
                                                    <span>CAMAS</span>
                                                    <h2>{item.bedroom} Camas </h2>
                                                </div>
                                                <div className="details-sub">
                                                    <span>TAMAÑO DE HABITACIÓN</span>
                                                    <h2>870 pies² / {item.sqm} m²</h2>
                                                </div>
                                                <div className="details-sub">
                                                    <span>OCUPACIÓN</span>
                                                    <h2>{item.capacity} adultos ({item.Children} niños)</h2>
                                                </div>
                                                <div className="details-sub">
                                                    <span>Baño</span>
                                                    <h2>{item.bathroom} Ducha con bañera</h2>
                                                </div>
                                                <div className="details-sub">
                                                    <h5>Costo <span>${item.price}</span> /Noche</h5>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Rooms item={item} />

                    <div className="Room-details-area pb-120">
                        <div className="container">
                            <div className="row">
                                <RoomDetails roomId={item.id} />
                                {/* ✅ Ahora item.id está garantizado como número */}
                                <RoomSidebar roomTypeId={item.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default RoomSinglePage;