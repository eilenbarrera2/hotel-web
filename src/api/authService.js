import api from './api';

export const authService = {
    // Registro
    register: async (name, email, password, password_confirmation) => {
        try {
            console.log('📤 Enviando registro...');

            const response = await api.post('/register', {
                name,
                email: email.toLowerCase(),
                password,
                password_confirmation
            });

            console.log('✅ Response registro:', response.data);

            // ✅ Verificar estructura de respuesta
            if (response.data.data && response.data.data.access_token) {
                const token = response.data.data.access_token;
                const userData = {
                    id: response.data.data.id,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    role: response.data.data.role
                };

                // Guardar en localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                console.log('✅ Token guardado:', token.substring(0, 20) + '...');
                console.log('✅ Usuario guardado:', userData);

                return response.data;
            } else {
                throw new Error('Respuesta del servidor no contiene token');
            }
        } catch (error) {
            console.error('❌ Error completo registro:', error);
            console.error('❌ Error response:', error.response?.data);
            throw error.response?.data || error;
        }
    },

    // Login
    login: async (email, password) => {
        try {
            console.log('📤 Enviando login para:', email);

            const response = await api.post('/login', {
                email: email.toLowerCase(),
                password: password
            });

            console.log('✅ Response login:', response.data);

            // ✅ Verificar estructura de respuesta
            if (response.data.data && response.data.data.access_token) {
                const token = response.data.data.access_token;
                const userData = {
                    id: response.data.data.id,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    role: response.data.data.role
                };

                // Guardar en localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                console.log('✅ Token guardado:', token.substring(0, 20) + '...');
                console.log('✅ Usuario guardado:', userData);

                return response.data;
            } else {
                throw new Error('Respuesta del servidor no contiene token');
            }
        } catch (error) {
            console.error('❌ Error completo login:', error);
            console.error('❌ Error response:', error.response?.data);
            throw error.response?.data || error;
        }
    },

    // Logout
    logout: async () => {
        try {
            console.log('📤 Cerrando sesión...');
            await api.post('/logout');

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            console.log('✅ Logout exitoso');
        } catch (error) {
            console.error('⚠️ Error en logout, limpiando localStorage de todos modos');

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            throw error;
        }
    },

    // Obtener usuario actual
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn('⚠️ No hay token - usuario no autenticado');
            return null;
        }

        return userStr ? JSON.parse(userStr) : null;
    },

    // Verificar si está autenticado
    isAuthenticated: () => {
        const hasToken = localStorage.getItem('token') !== null;
        const hasUser = localStorage.getItem('user') !== null;

        console.log('🔐 Estado autenticación:', { hasToken, hasUser });

        return hasToken && hasUser;
    }
};