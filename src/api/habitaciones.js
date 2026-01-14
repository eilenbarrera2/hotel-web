import dimg1 from '../images/destination/1.jpg'
import dimg2 from '../images/destination/2.jpg'
import dimg3 from '../images/destination/3.jpg'
import dimg4 from '../images/destination/6.jpg'
import dimg5 from '../images/destination/7.jpg'
import dimg6 from '../images/destination/8.jpg'

import dSimg1 from '../images/destination-single/img-1.jpg'
import dSimg2 from '../images/destination-single/img-2.jpg'
import dSimg3 from '../images/destination-single/img-3.jpg'
import dSimg4 from '../images/destination-single/img-4.jpg'
import dSimg5 from '../images/destination-single/img-5.jpg'
import dSimg6 from '../images/destination-single/img-6.jpg'

const Habitaciones = [
    {
        id: 1,  // ✅ Cambiado a número (importante para match con backend)
        title: 'Habitación sencilla',
        dimg1: dimg1,
        proImg: dimg1,  // ✅ Agregado para SearchRooms
        dSimg: dSimg1,
        price: 900,  // ✅ Cambiado a número
        capacity: 1,  // ✅ Número máximo de adultos
        Children: 1,  // ✅ Número máximo de niños
        description: 'Habitación acogedora ideal para una persona. Incluye cama individual, TV, WiFi y baño privado.'
    },
    {
        id: 2,
        title: 'Habitación doble',
        dimg1: dimg2,
        proImg: dimg2,
        dSimg: dSimg2,
        price: 1200,
        capacity: 2,  // ✅ 2 adultos
        Children: 2,  // ✅ Hasta 2 niños
        description: 'Espaciosa habitación con cama matrimonial o dos camas individuales. Perfecta para parejas o amigos.'
    },
    {
        id: 3,
        title: 'Habitación triple',
        dimg1: dimg3,
        proImg: dimg3,
        dSimg: dSimg3,
        price: 1500,
        capacity: 3,  // ✅ 3 adultos
        Children: 2,  // ✅ Hasta 2 niños
        description: 'Amplia habitación con tres camas individuales o una matrimonial y una individual. Ideal para familias pequeñas.'
    },
    {
        id: 4,
        title: 'Habitación familiar',
        dimg1: dimg4,
        proImg: dimg4,
        dSimg: dSimg4,
        price: 2000,
        capacity: 4,  // ✅ 4 adultos
        Children: 3,  // ✅ Hasta 3 niños
        description: 'Gran habitación diseñada para familias. Incluye dos camas matrimoniales y área de estar.'
    },
    {
        id: 5,
        title: 'Habitación familiar con jacuzzi',
        dimg1: dimg5,
        proImg: dimg5,
        dSimg: dSimg5,
        price: 2500,
        capacity: 4,  // ✅ 4 adultos
        Children: 3,  // ✅ Hasta 3 niños
        description: 'Nuestra suite premium con jacuzzi privado, balcón y las mejores vistas. Perfecta para una experiencia de lujo.'
    },
];

export default Habitaciones;