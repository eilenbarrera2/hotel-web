import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo2.png'
import ServiceSection from '../../components/ServiceSection';


const ServicePageS2 = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Servicios'} pagesub={'Servicios'} />
            <ServiceSection svClass={'section-padding'} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default ServicePageS2;
