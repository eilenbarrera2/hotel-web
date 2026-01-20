// src/api/passwordService.js
import api from './api';

export const passwordService = {
    /**
     * Enviar enlace de recuperación de contraseña
     * @param {string} email - Email del usuario
     * @returns {Promise} - Respuesta del servidor
     */
    sendResetLink: async (email) => {
        try {
            console.log('📤 Enviando enlace de recuperación a:', email);

            const response = await api.post('/forgot-password', {
                email: email.toLowerCase().trim()
            });

            console.log('✅ Enlace enviado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al enviar enlace:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    },

    /**
     * Resetear contraseña con token
     * @param {Object} data - Datos del reseteo (token, email, password, password_confirmation)
     * @returns {Promise} - Respuesta del servidor
     */
    resetPassword: async (data) => {
        try {
            console.log('📤 Reseteando contraseña para:', data.email);

            const response = await api.post('/reset-password', {
                token: data.token,
                email: data.email.toLowerCase().trim(),
                password: data.password,
                password_confirmation: data.password_confirmation
            });

            console.log('✅ Contraseña reseteada:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al resetear contraseña:', error.response?.data || error.message);
            throw error.response?.data || error;
        }
    }
};

export default passwordService;