import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { contentService } from '../../api/contentService';

import test1 from '../../images/testimonial/img-1.jpg';
import test2 from '../../images/testimonial/img-2.jpg';
import test3 from '../../images/testimonial/img-3.jpg';

const defaultImages = [test1, test2, test3];

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await contentService.getTestimonials();

            if (response.success && response.data.items.length > 0) {
                setTestimonials(response.data.items);
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStarRating = (rating) => {
        const stars = [];
        const maxStars = 5;
        const fullStars = Math.floor(rating);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa fa-star" aria-hidden="true"></i>);
        }

        for (let i = fullStars; i < maxStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa fa-star-o" aria-hidden="true"></i>);
        }

        return stars;
    };

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    if (loading) {
        return (
            <div className="wpo-testimonial-area">
                <div className="container">
                    <div className="wpo-testimonial-wrap">
                        <div className="text-center py-5">
                            <p>Cargando testimonios...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (testimonials.length === 0) {
        return null; // No mostrar la sección si no hay testimonios
    }

    return (
        <div className="wpo-testimonial-area">
            <div className="container">
                <div className="wpo-testimonial-wrap">
                    <div className="testimonial-slider">
                        <Slider {...settings}>
                            {testimonials.map((testimonial, index) => (
                                <div className="wpo-testimonial-item" key={testimonial.id}>
                                    <div className="wpo-testimonial-img">
                                        <img
                                            src={testimonial.image_url || defaultImages[index % 3]}
                                            alt={testimonial.name}
                                            onError={(e) => {
                                                e.target.src = defaultImages[index % 3];
                                            }}
                                        />
                                    </div>
                                    <div className="wpo-testimonial-content">
                                        <p>{testimonial.comment}</p>

                                        {testimonial.rating && (
                                            <div style={{
                                                marginBottom: '10px',
                                                color: '#ffa500'
                                            }}>
                                                {getStarRating(testimonial.rating)}
                                            </div>
                                        )}

                                        <h2>{testimonial.name}</h2>
                                        <span>Cliente Satisfecho</span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;