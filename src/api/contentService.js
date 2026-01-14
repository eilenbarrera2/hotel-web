// src/services/contentService.js
import api from './api';

export const contentService = {
    // About
    getAbout: async () => {
        try {
            const response = await api.get('/about');
            return response.data;
        } catch (error) {
            console.error('Error fetching about:', error);
            throw error;
        }
    },

    // Ofertas
    getOffers: async (date = null) => {
        try {
            const params = date ? { date } : {};
            const response = await api.get('/offers', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw error;
        }
    },

    getOffer: async (id) => {
        try {
            const response = await api.get(`/offers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching offer:', error);
            throw error;
        }
    },

    // Noticias
    getNews: async () => {
        try {
            const response = await api.get('/news');
            return response.data;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    getNewsItem: async (id) => {
        try {
            const response = await api.get(`/news/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching news item:', error);
            throw error;
        }
    },

    // Testimonios
    getTestimonials: async () => {
        try {
            const response = await api.get('/testimonials');
            return response.data;
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            throw error;
        }
    },

    // Eventos
    getEvents: async () => {
        try {
            const response = await api.get('/events');
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    getEvent: async (id) => {
        try {
            const response = await api.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }
};