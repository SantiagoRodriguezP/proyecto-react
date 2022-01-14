import React from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import '../styles/welcome.css';

function Welcome() {
    const cookies = new Cookies();
    return (
        <>
            <Menu />
            <div style={{ float: 'right', width: '85%' }}>
                <h1>Bienvenido {cookies.get('nombre')} {cookies.get('apellidos')}</h1>
                <section className='container px-4'>
                    <div className='div1 px-6'>
                        <h2 className='ml-2'>Aranda News</h2>
                        <p>Entérate de todas las noticias y novedades del 2021</p>
                    </div>
                    <div className='div2'>
                        <img width="273" height="238" srcSet="https://arandasoft.com/wp-content/uploads/2021/05/img-banner-comunicados-prensa-04.png" alt="" loading="lazy"/>
                    </div>
                </section>
                <aside className='container px-4'>
                    <h3>Better Together 2021 Generando soluciones de impacto</h3>
                    <div className='contenido'>
                        <div className='mt-4 div-img'>
                            <img width="428" height="auto" srcSet="https://arandasoft.com/wp-content/uploads/2021/07/newsletter-2021-comunicado-better-togueter-aranda-software.png" alt="" loading="lazy" />
                        </div>
                        <div className='parrafo'>
                            <p className='p mt-5'>Nos reunimos con nuestros socios de negocio en un espacio virtual para afianzar relaciones y potencializar su conocimiento sobre los beneficios de la integración de productos con los fabricantes más importantes de la región. Se resaltó, además el desarrollo de Aranda for Education, mostrando los beneficios que la solución presenta para el sector educativo.
                            <br/><br/><br/>Para apoyar la contextualización del panorama actual en la industria, se contó con la participación de speakers internacionales como:</p>
                            <ul>
                                <li><strong>José Ananos, SMB Sales Specialist de Intel</strong></li>
                                <li><strong>Juan Esteban Jaramillo, Channel Daas Program Manager de HP</strong></li>
                                <li><strong>Edmundo Miralles, Director de Productos Cloud de Microsoft</strong></li>
                                <li><strong>Joaquín Guerrero, Sr. Program Manager for Teams</strong></li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}


export default Welcome;