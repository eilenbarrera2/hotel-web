import api from './api';

export const cartService = {
    // Obtener carrito
    getCart: async () => {
        try {
            console.log('📤 Solicitando carrito al backend...');
            // CAMBIO AQUÍ: Quitamos '/api' porque ya está en la baseURL
            const response = await api.get('/cart'); 
            console.log('✅ Carrito obtenido:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al obtener carrito:', error.response?.data || error.message);
            throw error;
        }
    },

    // Agregar al carrito
    addToCart: async (roomData) => {
        try {
            console.log('📤 Agregando al carrito:', roomData);
            // CAMBIO AQUÍ: '/api/cart' -> '/cart'
            const response = await api.post('/cart', roomData);
            console.log('✅ Item agregado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al agregar:', error.response?.data || error.message);
            throw error;
        }
    },

    // Eliminar del carrito
    removeFromCart: async (cartItemId) => {
        try {
            console.log('📤 Eliminando item:', cartItemId);
            // CAMBIO AQUÍ: '/api/cart/...' -> '/cart/...'
            const response = await api.delete(`/cart/${cartItemId}`);
            console.log('✅ Item eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al eliminar:', error.response?.data || error.message);
            throw error;
        }
    },

    // Vaciar carrito
    clearCart: async () => {
        try {
            console.log('📤 Vaciando carrito...');
            // CAMBIO AQUÍ: '/api/cart' -> '/cart'
            const response = await api.delete('/cart');
            console.log('✅ Carrito vaciado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al vaciar carrito:', error.response?.data || error.message);
            throw error;
        }
    }
};