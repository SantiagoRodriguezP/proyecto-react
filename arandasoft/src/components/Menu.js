import React, { Component, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate, Link, } from 'react-router-dom';
import '../styles/menu.css';
import logo from '../assets/logo-aranda.png';
import axios from 'axios';



function Menu() {
  const cookies = new Cookies();

  const navigate = useNavigate();
  const [dataPermisos, setData] = useState([]);

  const cerrarSesion = () => {
    cookies.remove('idUsuario', { path: '/' });
    cookies.remove('nombreUsuario', { path: '/' });
    cookies.remove('clave', { path: '/' });
    cookies.remove('nombre', { path: '/' });
    cookies.remove('apellidos', { path: '/' });
    cookies.remove('idRol', { path: '/' });
    cookies.remove('rol', { path: '/' });
    cookies.remove('edad', { path: '/' });
    cookies.remove('email', { path: '/' });
    cookies.remove('telefono', { path: '/' });
    cookies.remove('direccion', { path: '/' });
    cookies.remove('clave', { path: '/' });
    sessionStorage.removeItem('permisos');
    navigate('../');
  }

  const rol = cookies.get("idRol");

  // let display = '';
  // let displayUser = '';
  // display = rol === "1" ? 'none' : 'block';
  // displayUser = rol === "1" ? 'none' : 'block';

  const getPermisosAsignados = async () => {
    
    const baseUrl = "https://localhost:44370/api/";
    const cookies = new Cookies();
    let rol = cookies.get('idRol');
    if (cookies.get('idUsuario')) {
      await axios.get(baseUrl + `permisosasignados/${rol}`)
        .then(response => {
          setData(response.data);
        }).then(response => {
          if (response) {
            loadData();
          }
        });

    }
  }
   const  loadData =() => {
    const permisos = [];
    console.log(dataPermisos.map(a => (console.log(a))));
    dataPermisos.forEach(element => {
      permisos.push(element.idPermiso);
      console.log("A", element.idPermiso);
    });
    console.log("pErmisos" + permisos);
    sessionStorage.setItem('permisos', permisos);
  }
  const usuarios = (
    <Link to="/usuarios">Usuarios</Link>

  )
  const roles = (
    <Link to="/roles" >Roles</Link>
  );
  const permisos = (
    <Link to="/permisos" >Permisos</Link>
  );
  const permisosAsignados = (
    <Link to="/permisosAsignados" >Asignación de permisos</Link>
  );
  useEffect(() => {
    if (!cookies.get('idUsuario')) {
      navigate('../');
    }
    getPermisosAsignados();
  }, []);

  //style={{display: cookies.get("rol")==='1' ? 'none' : 'block' }}

  return (
    <>
      <div className='usuario'>
        <div className='info ml-2'>
          <span>Bienvenido <b>{cookies.get('nombreUsuario')}</b></span>
          <h4>{cookies.get('nombre')} {cookies.get('apellidos')}</h4>
        </div>
      </div>
      {/* <div>
        <p>
          {cookies.get('nombre')} {cookies.get('apellidos')}
        </p>
        <h1>Id:{cookies.get('idUsuario')}</h1>
        <h1>{cookies.get('nombreUsuario')}</h1>
      </div> */}
      <header className="page-header" >
        <nav>
          <Link to='../perfil'>
            <img srcSet={logo} alt='logo' className='logo ' />
          </Link>
          <ul className="admin-menu mt-2">
            <li className="menu-heading">
              <h3>{cookies.get('nombreUsuario')}</h3>
              <label>{cookies.get('rol')}</label>
              <hr />
            </li>
            <li>
              <Link to="/welcome">Home</Link>
            </li>
            {(rol === "4") ? <li>{usuarios}</li> : ""}
            {(rol === "4") ? <li>{roles}</li> : ""}
            {(rol === "4") ? <li>{permisos}</li> : ""}
            {(rol === "4") ? <li>{permisosAsignados}</li> : ""}

            {/* {dataPermisos.map(a => (<li>{a.idPermiso}</li>))} */}
            {(rol === "2" || rol === "3") ? usuarios : ""}
            {
              dataPermisos.map(a => {
                // if (a.idRol === 2) return <li key={a.idRol}>{usuarios}</li>
                if (a.idPermiso === 3) return <li key={a.idPermiso}>{permisosAsignados}</li>;
                if (a.idPermiso === 4) return <li key={a.idPermiso}>{roles}</li>;
              })
            }
            <li>
              <Link to="/perfil" >Perfil</Link>
            </li>
          </ul>
          <ul className='mt-2'>
            <li>
              <button className='btn btn-danger' onClick={() => cerrarSesion()}>Cerrar Sesión</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Menu;