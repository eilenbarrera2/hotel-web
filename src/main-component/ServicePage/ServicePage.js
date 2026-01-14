import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo2.png'
import ServiceSection3 from '../../components/ServiceSection3/ServiceSection3';


const ServicePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Servicios'} pagesub={'Servicios'} />
            <ServiceSection3 />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default ServicePage;
