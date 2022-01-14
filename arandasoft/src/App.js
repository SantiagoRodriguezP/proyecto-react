import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';


function App() {

  const baseUrl="https://localhost:44370/api/usuarios";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false)
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    idUsuario: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',
    edad: '',
    rol: '',
    permiso: '',
    nombreUsuario: '',
    clave: ''
  });

  const handleChange =(e)=>{
    e.preventDefault(); 
    const {name, value}=e.target;
    setUsuarioSeleccionado({
      ...usuarioSeleccionado,
      [name]:value
  },);
    
    console.log(usuarioSeleccionado);
  }
  const openCloseModal=()=>{
    setModalInsertar(!modalInsertar);
  }
  const openCloseModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const openCloseModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data.usuario);
      console.log(response.data.usuario);
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionPost=async()=>{
    delete usuarioSeleccionado.idUsuario;
    await axios.post(baseUrl, usuarioSeleccionado)
    .then(response=>{
      setData(data.concat(response.data.usuario));
      console.log(response.data.usuario);
      openCloseModal();
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+usuarioSeleccionado.idUsuario, usuarioSeleccionado)
    .then(response=>{
      var respuesta = response.data.usuario;
      var dataAuxiliar = data;
      dataAuxiliar.map(usuario=>{
        if(usuario.idUsuario===usuarioSeleccionado.idUsuario){
          usuario.idUsuario=respuesta.idUsuario;
          usuario.nombre=respuesta.nombre;
          usuario.apellidos=respuesta.apellidos;
          usuario.direccion=respuesta.direccion;
          usuario.telefono=respuesta.telefono;
          usuario.email=respuesta.email;
          usuario.edad=respuesta.edad;
          usuario.rol=respuesta.rol;
          usuario.permiso=respuesta.permiso;
          usuario.nombreUsuario=respuesta.nombreUsuario;
          usuario.clave=respuesta.clave;
        }
      });
      openCloseModalEditar();
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+usuarioSeleccionado.idUsuario)
    .then(response=>{
      console.log(response.data);
      setData(data.filter(usuario=>usuario.idUsuario!==response.data.id));
      openCloseModalEliminar();
    }).catch(error=>{
      console.log(error);
    });
  }
  
  const seleccionarUsuario=(usuario, accion)=>{
    setUsuarioSeleccionado(usuario);
    (accion==="Editar")?
    openCloseModalEditar() : openCloseModalEliminar();
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div className="App">
      <button onClick={()=>openCloseModal()} className='btn btn-success'>Nuevo<i className="bi bi-plus-circle-fill"></i></button>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombres</th>
          <th>direccion</th>
          <th>Telefono</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Rol</th>
          <th>Permiso</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          {data.map(usuario=>(
          <tr key={usuario.idUsuario}>
            <td>{usuario.idUsuario}</td>
             <td>{usuario.nombre} {usuario.apellidos} </td>
             <td>{usuario.direccion}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.email}</td>
            <td>{usuario.edad}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.permiso}</td>  
            <td>
              <button className='btn btn-primary' onClick={()=>seleccionarUsuario(usuario, "Editar")}>Editar</button> {""}
              <button className='btn btn-danger' onClick={()=>seleccionarUsuario(usuario, "Eliminar")}>Eliminar</button>
            </td>
          </tr>
        )) }  
      </tbody>
    </table>
    <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar usuario</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nombre</label>
            <input type="text" className='form-control' name="nombre" onChange={handleChange}/>
            <label>Apellidos</label>
            <input type="text" className='form-control' name="apellidos" onChange={handleChange}/>
            <label>Dirección</label>
            <input type="text" className='form-control' name="direccion" onChange={handleChange}/>
            <label>Telefono</label>
            <input type="text" className='form-control' name="telefono" onChange={handleChange}/>
            <label>Email</label>
            <input type="text" className='form-control' name="email" onChange={handleChange}/>
            <label>Edad</label>
            <input type="number" className='form-control' name="edad" onChange={handleChange}/>
            <label>Rol</label>
            <input type="text" className='form-control' name="rol" onChange={handleChange}/>
            <label>Permiso</label>
            <input type="text" className='form-control' name="permiso" onChange={handleChange}/>
            <label>Nombre Usuario</label>
            <input type="text" className='form-control' name="nombreUsuario" onChange={handleChange}/>
            <label>Contraseña</label>
            <input type="text" className='form-control' name="clave" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>peticionPost()}>Insertar</button> {"  "}
          <button className='btn btn-danger' onClick={()=>openCloseModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar usuario</ModalHeader>
        <ModalBody>
          <div className='form-group'>
          <label>Id</label>
          <input type="text" className='form-control' name="nombre" readOnly value={usuarioSeleccionado && usuarioSeleccionado.idUsuario}/>
            <label>Nombre</label>
            <input type="text" className='form-control' name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
            <label>Apellidos</label>
            <input type="text" className='form-control' name="apellidos" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellidos}/>
            <label>Dirección</label>
            <input type="text" className='form-control' name="direccion" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.direccion}/>
            <label>Telefono</label>
            <input type="text" className='form-control' name="telefono" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.telefono}/>
            <label>Email</label>
            <input type="text" className='form-control' name="email" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.email}/>
            <label>Edad</label>
            <input type="number" className='form-control' name="edad" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.edad}/>
            <label>Rol</label>
            <input type="text" className='form-control' name="rol" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.rol}/>
            <label>Permiso</label>
            <input type="text" className='form-control' name="permiso" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.permiso}/>
            <label>Nombre Usuario</label>
            <input type="text" className='form-control' name="nombreUsuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombreUsuario}/>
            <label>Contraseña</label>
            <input type="text" className='form-control' name="clave" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.clave}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>peticionPut()}>Guardar</button> {"  "}
          <button className='btn btn-danger' onClick={()=>openCloseModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

       <Modal isOpen={modalEliminar}>
         <ModalBody>
           ¿Está seguro que desea eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombreUsuario}? 
         </ModalBody>
         <ModalFooter>
           <button className='btn btn-danger' onClick={()=>peticionDelete()}>Si</button>
           <button className='btn btn-secondary' onClick={()=>openCloseModalEliminar()}>No</button>
         </ModalFooter>
       </Modal>


    </div>
  );
}

export default App;
