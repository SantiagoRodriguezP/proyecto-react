import React from 'react';
import { BrowserRouter, Routes,Route}  from "react-router-dom";
import Menu from '../components/Menu';
import Login from '../components/Login';
import Usuarios from '../components/Usuarios'
import Permisos from '../components/Permisos';
import Roles from '../components/Roles';
import Perfil from '../components/Perfil';
import PermisosAsignados from '../components/PermisosAsignados';
import Welcome from '../components/Welcome';

function Rutas(){
    return(
       <BrowserRouter>
       <Routes>
           <Route exact path="/" element={<Login/>}/>
           <Route exact path="/menu" element={<Menu/>}/>
           <Route exact path="/usuarios" element={<Usuarios/>}/>
           <Route exact path="/permisos" element={<Permisos/>}/>
           <Route exact path="/roles" element={<Roles/>}/>
           <Route exact path="/perfil" element={<Perfil/>}/>
           <Route exact path="/permisosAsignados" element={<PermisosAsignados/>}/>
           <Route exact path="/welcome" element={<Welcome/>}/>
       </Routes>
       </BrowserRouter>
    )
}

export default Rutas;