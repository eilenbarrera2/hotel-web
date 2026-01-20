function getFlashProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 8);
}

function getFeaturedProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 12);
}

// ✅ Función actualizada para manejar habitaciones de hotel
function totalPrice(items) {
    if (!Array.isArray(items)) {
        console.warn('⚠️ totalPrice recibió algo que no es un array:', items);
        return 0;
    }

    const total = items.reduce((itemAcc, item) => {
        // Prioridad 1: usar total_price si existe (viene del backend)
        if (item.total_price !== undefined && item.total_price !== null) {
            const price = parseFloat(item.total_price) || 0;
            console.log('💰 Usando total_price:', { item: item.title, price });
            return itemAcc + price;
        }

        // Prioridad 2: calcular desde price y nights/qty
        const quantity = item.nights || item.qty || 1;
        const price = parseFloat(item.price) || 0;
        const calculated = price * quantity;

        console.log('💰 Calculando precio:', {
            item: item.title,
            price,
            quantity,
            calculated
        });

        return itemAcc + calculated;
    }, 0);

    console.log('💵 Total final del carrito:', total);
    return total;
}

function isWishListed(productId, wishList) {
    return wishList.findIndex(product => product.id === productId) !== -1;
}

function getCompareList(items) {
    return items.slice(0, 4);
}

function searchFilter(row, search) {
    return row.title.toLowerCase().includes(search.toLowerCase()) || !search;
}

// short helper function
function checkLengNull(data) {
    if (data !== null) {
        return data.length > 0;
    }
    return false;
}

function isEquals(a, b) {
    if (a !== null && b !== null) {
        return a.toLowerCase() === b.toLowerCase();
    }
    return a === b
}

function minValueOne(qty) {
    if (qty < 1) {
        return 1;
    }
    return qty;
}

// filter function
function filterProductByCategory(product, selected_category) {
    if (checkLengNull(selected_category)) {
        return product.category.toLowerCase() === selected_category.toLowerCase();
    }
    return true
}

function filterProductByPrice(product, price) {
    if (checkLengNull(price)) {
        return product.price >= price[0] && product.price <= price[1];
    }
    return true
}

function filterProductByColor(product, color) {
    if (checkLengNull(color)) {
        for (var i = 0; i < product.colors.length; i++) {
            if (product.colors[i].toLowerCase() === color.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
}

function filterProductBySize(product, size) {
    if (checkLengNull(size)) {
        for (var i = 0; i < product.size.length; i++) {
            if (product.size[i].toLowerCase() === size.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
}

export {
    getFlashProducts,
    getFeaturedProducts,
    totalPrice,
    isWishListed,
    filterProductByCategory,
    filterProductByPrice,
    filterProductByColor,
    filterProductBySize,
    isEquals,
    minValueOne,
    getCompareList,
    searchFilter
};