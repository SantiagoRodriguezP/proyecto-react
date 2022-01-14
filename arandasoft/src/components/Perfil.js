import React from 'react'
import Menu from './Menu';
import '../styles/perfil.css';
import Cookies from 'universal-cookie';

function Profile() {
    const cookies = new Cookies();

    return (
        <>
            <Menu />
            <div className="container" style={{ float: 'right', width: '85%' }}>
                {/* <div className='card-perfil'>
                    <h5>Nombre Usuario:</h5>
                    <h5>Nombres Completos:</h5>
                    <h5>Dirección:</h5>
                    <h5>Telefono:</h5>
                    <h5>Email:</h5>
                    <h5>Edad:</h5>
                    <h5>Rol:</h5>
                </div> */}
                <div className="card text-center">
                    <div className="card-header">
                        <h1>Usuario en Sesión</h1>
                    </div>
                    <div className="card-body">
                        <h5>Nombre Usuario:  {cookies.get('nombreUsuario')}</h5>
                        <h5>Nombres Completos:   {cookies.get('nombre')} {cookies.get('apellidos')}</h5>
                        <h5>Dirección: {cookies.get('direccion')}</h5>
                        <h5>Telefono: {cookies.get('telefono')}</h5>
                        <h5>Email: {cookies.get('email')}</h5>
                        <h5>Edad: {cookies.get('edad')}</h5>
                        <h5>Rol: {sessionStorage.getItem("rol")}</h5>
                        <h5>Contraseña: {cookies.get('clave')}</h5>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Profile;