import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo.png'
import Rooms2 from '../../components/Rooms2/Rooms2';

const RoomPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Habitaciones'} pagesub={'Habitaciones'} />
            <Rooms2 />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default RoomPage;
