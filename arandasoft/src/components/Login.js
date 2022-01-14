import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-aranda.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const baseUrl = "https://localhost:44370/api/";
    const cookies = new Cookies();
    const [form, setForm] = useState({
        nombreUsuario: '',
        clave: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
        console.log(form);
    }

    const iniciarSesion = async () => {
        if (!form.nombreUsuario || !form.clave) { alert("Usuario y contraseña requeridos"); return };
        await axios.get(baseUrl + `usuarios/${form.nombreUsuario}/${form.clave}`)
            .then(response => {
                return response.data;
            }).then(response => {
                if (response) {
                    cookies.set('idUsuario', response.idUsuario, { path: '/' });
                    cookies.set('nombreUsuario', response.nombreUsuario, { path: '/' });
                    cookies.set('clave', response.clave, { path: '/' });
                    cookies.set('nombre', response.nombre, { path: '/' });
                    cookies.set('apellidos', response.apellidos, { path: '/' });
                    cookies.set('idRol', response.idRol, { path: '/' });
                    cookies.set('rol', response.rol, { path: '/' });
                    cookies.set('edad', response.edad, { path: '/' });
                    cookies.set('email', response.email, { path: '/' });
                    cookies.set('telefono', response.telefono, { path: '/' });
                    cookies.set('direccion', response.direccion, { path: '/' });
                    cookies.set('clave', response.clave, { path: '/' });
                    alert("Bienvenido " + response.nombre);
                    //this.props.history.push('usuarios');
                    // Almacena la información en sessionStorage
                    console.log(cookies.get("rol"));
                    navigate('/welcome');
                    //     if(cookies.get("rol")==='1'){
                    //        navigate('/welcome');    
                    //    }else{
                    //         navigate('/perfil');
                    //    }
                } else {
                    alert('El usuario o contraseña no son correctos');
                }
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (cookies.get('idUsuario')) {
            navigate('/menu');
        }
    });

    return (
        <>
            <div className='container mt-5 mb-5'>
                <div className='contenedor mx-auto'>
                    <img srcSet={logo} alt='logo' className='logo ' />
                    <h1 className='mt-5'>Bienvenido</h1>
                    <p>Ingrese sus credenciales para acceder  a su cuenta</p>
                    <div className="form-group width">
                        <label>Usuario</label>
                        <input type="text" name="nombreUsuario" className='form-control' onChange={handleChange} />
                    </div>
                    <div className="form-group width">
                        <label>Contraseña</label>
                        <input type="text" name="clave" className='form-control' onChange={handleChange} />
                    </div>
                    <button className='btn btn-primary boton-iniciar width mt-2' onClick={() => iniciarSesion()}>Acceder</button>
                </div>
            </div>
        </>
    )
}
export default Login;
