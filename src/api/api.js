import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false  // ✅ Token authentication no necesita cookies
});

// ✅ Interceptor para agregar el token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Token agregado al header:', token.substring(0, 20) + '...');
        } else {
            console.warn('⚠️ No hay token en localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Interceptor de respuesta para manejar errores
api.interceptors.response.use(
    (response) => {
        console.log('✅ Respuesta exitosa:', response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ Error en petición:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            console.warn('🚪 Token inválido o expirado - Redirigiendo a login');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;