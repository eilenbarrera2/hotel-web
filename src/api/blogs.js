// images
import blogImg1 from "../images/blog/img-1.jpg";
import blogImg2 from "../images/blog/img-2.jpg";
import blogImg3 from "../images/blog/img-3.jpg";

import blogSingleImg1 from "../images/blog/img-4.jpg";
import blogSingleImg2 from "../images/blog/img-5.jpg";
import blogSingleImg3 from "../images/blog/img-6.jpg";

const blogs = [
    {
        id: '1',
        title: 'Mi Experiencia Increíble en el Hotel Dios Padre',
        screens: blogImg1,
        description: 'Pasamos un fin de semana maravilloso. Las aguas termales son relajantes, el servicio excelente y la comida deliciosa. ¡Definitivamente volveremos!',
        author: 'María González',
        create_at: '25 Sep 2022',
        blogSingleImg: blogSingleImg1,
        comment: '35',
        blClass: 'format-standard-image',
    },
    {
        id: '2',
        title: 'Escapada Romántica Perfecta en el Balneario',
        screens: blogImg2,
        description: 'Mi pareja y yo disfrutamos cada momento. Los masajes en pareja fueron espectaculares y las albercas termales bajo las estrellas son mágicas.',
        author: 'Roberto y Ana Martínez',
        create_at: '23 Sep 2022',
        blogSingleImg: blogSingleImg2,
        comment: '80',
        blClass: 'format-standard-image',
    },
    {
        id: '3',
        title: 'Lo Mejor de Mi Visita al Hotel Dios Padre',
        screens: blogImg3,
        description: 'Desde las habitaciones limpias hasta la atención del personal, todo fue de primera. Las aguas termales curativas valieron totalmente la pena el viaje.',
        author: 'Carmen López',
        create_at: '21 Sep 2022',
        blogSingleImg: blogSingleImg3,
        comment: '95',
        blClass: 'format-video',
    },
];
export default blogs;