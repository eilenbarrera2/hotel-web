import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo2.png'
import About2 from '../../components/about2/about2';
import FunFact from '../../components/FunFact';
import Rooms from '../../components/Rooms/Rooms';
import ServiceSection2 from '../../components/ServiceSection2/ServiceSection2';
import PricingSection from '../../components/PricingSection';
import Testimonial from '../../components/Testimonial';
import EventsSection from '../../components/EventsSection';

const AboutPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Sobre nosotros'} pagesub={'Nosotros'} />
            <About2 />
            <FunFact fClass={'section-padding'} />
            <EventsSection />
            <Rooms />
            <ServiceSection2 />
            <PricingSection />
            <Testimonial />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default AboutPage;
