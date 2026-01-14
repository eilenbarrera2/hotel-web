import React from 'react';
import { Link } from 'react-router-dom'
import blog3 from '../../images/blog-details/comments-author/img-1.jpg'
import blog4 from '../../images/blog-details/comments-author/img-2.jpg'
import blog5 from '../../images/blog-details/comments-author/img-3.jpg'
import blog6 from '../../images/blog-details/author.jpg'
import gl1 from '../../images/blog/img-7.jpg'
import gl2 from '../../images/blog/img-8.jpg'
import blogs from '../../api/blogs';
import { useParams } from 'react-router-dom'
import BlogSidebar from '../../components/BlogSidebar'

const BlogSingle = (props) => {

    const { id } = useParams()

    const BlogDetails = blogs.find(item => item.id === id)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <section className="wpo-blog-single-section section-padding">
            <div className="container">
                <div className="row">
                    <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                        <div className="wpo-blog-content">
                            <div className="post format-standard-image">
                                <div className="entry-media">
                                    <img src={BlogDetails.blogSingleImg} alt="" />
                                </div>
                                <div className="entry-meta">
                                    <ul>
                                        <li><i className="fi flaticon-user"></i> Por <Link to="/blog-single/1">{BlogDetails.author}</Link> </li>
                                        <li><i className="fi flaticon-comment-white-oval-bubble"></i> Comentarios {BlogDetails.comment}</li>
                                        <li><i className="fi flaticon-calendar"></i> {BlogDetails.create_at}</li>
                                    </ul>
                                </div>
                                <h2>{BlogDetails.title}</h2>
                                <p>Hay muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría han sufrido alteraciones de alguna forma, por humor inyectado, o palabras al azar que no se ven ni ligeramente creíbles. Si vas a usar un pasaje de Lorem Ipsum, necesitas estar seguro de que no hay nada embarazoso oculto en el medio del texto. Todos los generadores de Lorem Ipsum en Internet tienden a repetir fragmentos predefinidos según sea necesario, convirtiendo esto en el primer generador verdadero en Internet. Usa un diccionario de más de 200 palabras latinas, combinado con un puñado.</p>
                                <blockquote>
                                    Combinado con un puñado de estructuras de oraciones modelo, genera Lorem Ipsum que se ve razonable. El Lorem Ipsum generado por lo tanto siempre está libre de repetición, humor inyectado, o palabras no características, etc.
                                </blockquote>
                                <p>Debo explicarte cómo nació toda esta idea equivocada de denunciar el placer y alabar el dolor, y te daré un relato completo del sistema, y expondré las enseñanzas reales del gran explorador de la verdad, el maestro constructor de la felicidad humana. Nadie rechaza, no le gusta, o evita el placer en sí mismo,</p>

                                <div className="gallery">
                                    <div>
                                        <img src={gl1} alt="" />
                                    </div>
                                    <div>
                                        <img src={gl2} alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className="tag-share clearfix">
                                <div className="tag">
                                    <span>Compartir: </span>
                                    <ul>
                                        <li><Link to="/blog-single/1">Destino</Link></li>
                                        <li><Link to="/blog-single/1">Viajes</Link></li>
                                        <li><Link to="/blog-single/1">Tour Mundial</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tag-share-s2 clearfix">
                                <div className="tag">
                                    <span>Compartir: </span>
                                    <ul>
                                        <li><Link to="/blog-single/1">facebook</Link></li>
                                        <li><Link to="/blog-single/1">twitter</Link></li>
                                        <li><Link to="/blog-single/1">linkedin</Link></li>
                                        <li><Link to="/blog-single/1">pinterest</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="author-box">
                                <div className="author-avatar">
                                    <Link to="/blog-single/1" target="_blank"><img src={blog6} alt="" /></Link>
                                </div>
                                <div className="author-content">
                                    <Link to="/blog-single/1" className="author-name">Autor: Jenny Watson</Link>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                                    <div className="socials">
                                        <ul className="social-link">
                                            <li><Link to="/blog-single/1"><i className="ti-facebook"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-twitter-alt"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-linkedin"></i></Link></li>
                                            <li><Link to="/blog-single/1"><i className="ti-instagram"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="more-posts">
                                <div className="previous-post">
                                    <Link to="/blog">
                                        <span className="post-control-link">Publicación Anterior</span>
                                        <span className="post-name">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</span>
                                    </Link>
                                </div>
                                <div className="next-post">
                                    <Link to="/blog-left-sidebar">
                                        <span className="post-control-link">Siguiente Publicación</span>
                                        <span className="post-name">Dignissimos ducimus qui blanditiis praesentiu deleniti atque corrupti quos dolores</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="comments-area">
                                <div className="comments-section">
                                    <h3 className="comments-title">Comentarios</h3>
                                    <ol className="comments">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1">
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>John Abraham <span className="comments-date">12 de Enero, 2022
                                                                A las 9:00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>Te daré un relato completo del sistema, y
                                                                expondré las enseñanzas reales del gran explorador de
                                                                la verdad, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Responder</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="children">
                                                <li className="comment">
                                                    <div>
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><img src={blog4} alt="" /></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <h4>Lily Watson <span className="comments-date">12 de Enero,
                                                                        2022 A las 9:00am</span></h4>
                                                                </div>
                                                                <div className="comment-area">
                                                                    <p>Te daré un relato completo del sistema,
                                                                        y expondré las enseñanzas reales del gran
                                                                        explorador de la verdad, </p>
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" to="/blog-single/1"><span>Responder</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><img src={blog5} alt="" /></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <h4>John Abraham <span className="comments-date">12 de Enero,
                                                                                2022 A las 9:00am</span></h4>
                                                                        </div>
                                                                        <div className="comment-area">
                                                                            <p>Te daré un relato completo del
                                                                                sistema, y expondré las enseñanzas
                                                                                reales del gran explorador de la verdad, </p>
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Responder</span></Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="comment">
                                            <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>John Abraham <span className="comments-date">12 de Enero, 2022
                                                                A las 9:00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>Te daré un relato completo del sistema, y
                                                                expondré las enseñanzas reales del gran explorador de
                                                                la verdad, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" to="/blog-single/1"><span>Responder</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Publicar Comentarios</h3>
                                    <form onSubmit={submitHandler} id="commentform" className="comment-form">
                                        <div className="form-textarea">
                                            <textarea id="comment" placeholder="Escribe tus comentarios..."></textarea>
                                        </div>
                                        <div className="form-inputs">
                                            <input placeholder="Sitio Web" type="url" />
                                            <input placeholder="Nombre" type="text" />
                                            <input placeholder="Correo Electrónico" type="email" />
                                        </div>
                                        <div className="form-submit">
                                            <input id="submit" value="Publicar Comentario" type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogSidebar blLeft={props.blLeft} />
                </div>
            </div>
        </section>
    )

}

export default BlogSingle;