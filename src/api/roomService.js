import api from './api'; // ✅ Usar la instancia de Axios configurada

const roomService = {
    // Obtener tipos de habitación
    getRoomTypes: async () => {
        try {
            const response = await api.get('/room-types');
            return response.data;
        } catch (error) {
            console.error('Error al obtener tipos de habitación:', error);
            throw error;
        }
    },

    // Obtener habitación específica por tipo
    getRoomType: async (id) => {
        try {
            const response = await api.get(`/room-types/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener habitación:', error);
            throw error;
        }
    },

    // ✅ Verificar disponibilidad
    checkAvailability: async (params) => {
        try {
            const response = await api.get('/availability', {
                params: {
                    check_in: params.checkIn,
                    check_out: params.checkOut,
                    adults: params.adults || 1,
                    children: params.children || 0,
                    ...(params.roomTypeId && { room_type_id: params.roomTypeId })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            throw error.response?.data || error;
        }
    },

    // ✅ Obtener todas las habitaciones
    getRooms: async (filters = {}) => {
        try {
            const response = await api.get('/rooms', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error al obtener habitaciones:', error);
            throw error;
        }
    },

    // ==========================================
    // 🛒 MÉTODOS DEL CARRITO
    // ==========================================

    // ✅ Helper para transformar items del backend al formato del frontend
    transformCartItem: (item) => {
        console.log('🔧 Mapeando item:', item);

        const transformed = {
            // IDs
            id: item.cart_item_id || item.id,
            room_id: item.room_id,

            // Información de la habitación
            room_number: item.room_number,
            title: item.room_type || item.title || 'Habitación',
            proImg: item.image || '/images/room-default.jpg',

            // Capacidad
            capacity: parseInt(item.adults) || 2,
            Children: parseInt(item.children) || 0,
            adults: parseInt(item.adults) || 2,
            children: parseInt(item.children) || 0,

            // Fechas
            check_in: item.check_in,
            check_out: item.check_out,

            // Noches
            qty: parseInt(item.nights) || 1,
            nights: parseInt(item.nights) || 1,

            // Precios (asegurar que sean números)
            price: parseFloat(item.price_per_night) || 0,
            total_price: parseFloat(item.price_total) || 0,
            sum: parseFloat(item.price_total) || 0,

            // Extras
            discount: 0
        };

        console.log('✨ Item transformado:', transformed);
        return transformed;
    },

    // ✅ Obtener carrito del usuario actual
    getCart: async () => {
        try {
            console.log('📥 Obteniendo carrito del usuario...');
            const response = await api.get('/cart');
            console.log('✅ Carrito obtenido (raw):', response.data);

            // Extraer items del formato del backend
            let items = [];

            // El backend devuelve: { success, message, data: { items: [...], grand_total, count } }
            if (response.data.data && response.data.data.items && Array.isArray(response.data.data.items)) {
                items = response.data.data.items;
                console.log('📍 Items encontrados en response.data.data.items:', items.length);
            }
            // Fallback a otras estructuras posibles
            else if (Array.isArray(response.data)) {
                items = response.data;
                console.log('📍 Items en response.data (array directo)');
            } else if (response.data.data && Array.isArray(response.data.data)) {
                items = response.data.data;
                console.log('📍 Items en response.data.data (array)');
            } else if (response.data.cart && Array.isArray(response.data.cart)) {
                items = response.data.cart;
                console.log('📍 Items en response.data.cart');
            } else if (response.data.items && Array.isArray(response.data.items)) {
                items = response.data.items;
                console.log('📍 Items en response.data.items');
            } else {
                console.warn('⚠️ No se encontró el array de items en la respuesta');
            }

            console.log('📦 Items extraídos:', items);

            // Transformar cada item al formato del frontend
            const transformedItems = items.map(item => {
                console.log('🔄 Transformando item:', item);
                const transformed = roomService.transformCartItem(item);
                console.log('✅ Item transformado:', transformed);
                return transformed;
            });

            console.log('✅ Carrito final con', transformedItems.length, 'items:', transformedItems);

            return transformedItems;
        } catch (error) {
            console.error('❌ Error al obtener carrito:', error);
            throw error.response?.data || error;
        }
    },

    // ✅ Agregar item al carrito
    addToCart: async (cartItem) => {
        try {
            console.log('📤 Agregando al carrito:', cartItem);
            const response = await api.post('/cart', cartItem);
            console.log('✅ Item agregado (raw):', response.data);

            // Después de agregar, obtener el carrito completo actualizado
            const updatedCart = await roomService.getCart();
            return {
                success: true,
                message: 'Item agregado correctamente',
                cart: updatedCart
            };
        } catch (error) {
            console.error('❌ Error al agregar al carrito:', error);

            // Manejar errores específicos del backend
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error.response?.data || error;
        }
    },

    // ✅ Actualizar cantidad de un item
    updateCartItem: async (itemId, quantity) => {
        try {
            console.log(`🔄 Actualizando item ${itemId} a cantidad ${quantity}`);
            const response = await api.put(`/cart/${itemId}`, { quantity });
            console.log('✅ Item actualizado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al actualizar item:', error);
            throw error.response?.data || error;
        }
    },

    // ✅ Eliminar item del carrito
    removeFromCart: async (itemId) => {
        try {
            console.log(`🗑️ Eliminando item ${itemId} del carrito`);
            const response = await api.delete(`/cart/${itemId}`);
            console.log('✅ Item eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al eliminar del carrito:', error);
            throw error.response?.data || error;
        }
    },

    // ✅ Limpiar todo el carrito
    clearCart: async () => {
        try {
            console.log('🧹 Limpiando carrito completo...');
            const response = await api.delete('/cart');
            console.log('✅ Carrito limpiado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error al limpiar carrito:', error);
            throw error.response?.data || error;
        }
    }
};

export default roomService;