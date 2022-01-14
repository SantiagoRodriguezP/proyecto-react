import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import '../styles/perfil.css';
import Menu from './Menu';
import Select from 'react-select';
import Cookies from 'universal-cookie';


function GestionUsuarios() {
    const cookies = new Cookies();

    const baseUrl = "https://localhost:44370/api/";
    const [data, setData] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
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
        idRol: '',
        nombreUsuario: '',
        clave: ''
    });
    const [permisos, setPermisos] = useState([
        { value: '-1', label: 'Seleccione' }
    ]);
    const [roles, setRoles] = useState([
        { value: '-1', label: 'Seleccione' }
    ]);
    const [selectedOptionRol, setSelectedOptionRol] = useState([
        { value: '-1', label: 'Seleccione' }
    ]);
    const [selectedOptionPermiso, setSelectedOptionPermiso] = useState([
        { value: '-1', label: 'Seleccione' }
    ]);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaRol, setBusquedaRol] = useState("");
    let permisosAsignados = sessionStorage.getItem("permisos");
    permisosAsignados = (permisosAsignados !== null ? permisosAsignados : permisosAsignados = '0');
    const rol = cookies.get("idRol");

    const getRoles = async () => {
        await axios.get(baseUrl + 'roles')
            .then(response => {
                const rolesFormated = response.data.roles.map(r => {
                    return { value: r.idRol, label: r.nombre }
                })
                setRoles(rolesFormated);
            }).catch(error => {
                console.log(error);
            })
            ;
    }
    const getPermisos = async () => {
        await axios.get(baseUrl + 'permisos')
            .then(response => {
                const permisosFormated = response.data.permisos.map(r => {
                    return { value: r.idPermiso, label: r.permiso }
                })
                setPermisos(permisosFormated);
            }).catch(error => {
                console.log(error);
            });
    }
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUsuarioSeleccionado({
            ...usuarioSeleccionado,
            [name]: value
        });
        console.log(usuarioSeleccionado);
    }
    const handleChangeSelect = (e) => {
        console.log(e);
        const { label, value } = e;
        setUsuarioSeleccionado({
            ...usuarioSeleccionado,
            "idRol": value,
            "rol": label
        });
        setSelectedOptionRol(e);
        console.log(usuarioSeleccionado);
    }
    const handleChangeSelectPermiso = (e) => {
        console.log(e);
        const { label, value } = e;
        setUsuarioSeleccionado({
            ...usuarioSeleccionado,
            "idPermiso": value,
            "permiso": label
        });
        setSelectedOptionPermiso(e);
        console.log(usuarioSeleccionado);
    }
    const openCloseModal = () => {
        setModalInsertar(!modalInsertar);
    }
    const openCloseModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const openCloseModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }
    const peticionGet = async () => {
        await axios.get(baseUrl + 'usuarios')
            .then(response => {
                setData(response.data.usuario);
                setTablaUsuarios(response.data.usuario);
                //     console.log(response.data.usuario);
            }).catch(error => {
                console.log(error);
            });
    }
    const peticionPost = async () => {
        delete usuarioSeleccionado.idUsuario;
        await axios.post(baseUrl + 'usuarios', usuarioSeleccionado)
            .then(response => {
                setData(data.concat(response.data.usuario));
                console.log(response.data.usuario);
                openCloseModal();
            }).catch(error => {
                console.log(error);
            });
    }

    const peticionPut = async () => {
        debugger
        await axios.put(baseUrl + "usuarios/" + usuarioSeleccionado.idUsuario, usuarioSeleccionado)
            .then(response => {
                debugger
                var respuesta = response.data.usuario;
                var dataAuxiliar = data;
                alert(response.data.message);
                dataAuxiliar.map(usuario => {
                    if (usuario.idUsuario === usuarioSeleccionado.idUsuario) {
                        debugger
                        usuario.idUsuario = respuesta.idUsuario;
                        usuario.nombre = respuesta.nombre;
                        usuario.apellidos = respuesta.apellidos;
                        usuario.direccion = respuesta.direccion;
                        usuario.telefono = respuesta.telefono;
                        usuario.email = respuesta.email;
                        usuario.idPermiso = respuesta.idPermiso;
                        usuario.idRol = respuesta.idRol;
                        usuario.edad = respuesta.edad;
                        usuario.rol = usuarioSeleccionado.rol;
                        usuario.permiso = usuarioSeleccionado.permiso;
                        usuario.nombreUsuario = respuesta.nombreUsuario;
                        usuario.clave = respuesta.clave;
                        //const formatted = dataAuxiliar.map(r => { return { value: usuario.rol, label: usuario.rol }})
                        //  setSelectedOptionRol(formatted);
                    }
                });
                openCloseModalEditar();
            }).catch(error => {
                console.log(error);
            });
    }
    const peticionDelete = async () => {
        await axios.delete(baseUrl + "usuarios/" + usuarioSeleccionado.idUsuario)
            .then(response => {
                console.log(response.data);
                setData(data.filter(usuario => usuario.idUsuario !== response.data.id));
                openCloseModalEliminar();
            }).catch(error => {
                console.log(error);
            });
    }

    const seleccionarUsuario = (usuario, accion) => {
        console.log(usuario);
        setUsuarioSeleccionado(usuario);
        (accion === "Editar") ?
            openCloseModalEditar() : openCloseModalEliminar();
        console.log(usuario.idRol, usuario.rol);
        setSelectedOptionRol({ value: usuario.idRol, label: usuario.rol });
        setSelectedOptionPermiso({ value: usuario.idPermiso, label: usuario.permiso });
    }

    const handleSearch = (e) => {
        debugger
        e.preventDefault();
        const input = e.target.name;
        if (input === 'nombre') setBusqueda(e.target.value);
        if (input === 'rol') setBusquedaRol(e.target.value);
        filtrar(e.target.value, input);
    }
    const filtrar = (param, input) => {
        var resultado = tablaUsuarios.filter((elemt) => {
            if (input === 'nombre') {
                if (elemt.nombre.toString().toLowerCase().includes(param.toLowerCase())
                    || elemt.apellidos.toString().toLowerCase().includes(param.toLowerCase())) {
                    return elemt;
                }
            } else {
                if (elemt.rol.toString().toLowerCase().includes(param.toLowerCase())) {
                    return elemt;
                }
            }
        });
        setData(resultado);
    }

    useEffect(() => {
        peticionGet();
        getRoles();
        getPermisos();
        //  getPermisosAsignados(); 
    }, [])

    return (
        <>
            <Menu />

            <div className="App container" style={{ float: 'right', width: '85%' }}>
                <button onClick={() => openCloseModal()} className='btn btn-success mb-2' style={{ display: (permisosAsignados.includes('3') || rol === "4" ? 'block' : 'none') }}>Nuevo<i className="bi bi-plus-circle-fill"></i></button>
                <form>
                    <div className="row">
                        <div className="col">
                            <label>Nombre</label>
                            <input className='form-control' name='nombre' value={busqueda} onChange={handleSearch} placeholder='Búsqueda por Nombre' autoComplete='off' />
                        </div>
                        <div className="col">
                            <label>Rol</label>
                            <input type="text" className='form-control' name='rol' value={busquedaRol} onChange={handleSearch} placeholder='Búsqueda por Rol' />
                        </div>
                    </div>
                </form>

                {/* <div>
                    <form>
                        <label>Nombre</label>
                        <input className='form-control ' value={busqueda} onChange={handleSearch} placeholder='Búsqueda por Nombre' /> */}
                {/* <input type="text" className='form-control' name="nombreUsuario" />
                        <label>Rol</label>
                        <input type="text" className='filter-nombre' value={busqueda} onChange={handleSearch} /> */}
                {/* </form>
                </div> */}
                <table className='table table-bordered mt-2'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombres</th>
                            <th>direccion</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Edad</th>
                            <th>Rol</th>
                            {/* <th>Permiso</th> */}
                            <th>Usuario</th>
                            <th style={{ display: (permisosAsignados.includes('3') || permisosAsignados.includes('4') || rol === "3" || rol === "4" ? 'block' : 'none') }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(usuario => (
                            <tr key={usuario.idUsuario}>
                                <td>{usuario.idUsuario}</td>
                                <td>{usuario.nombre} {usuario.apellidos} </td>
                                <td>{usuario.direccion}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.edad}</td>
                                <td>{usuario.rol}</td>
                                {/* <td>{usuario.permiso}</td> */}
                                <td>{usuario.nombreUsuario}</td>
                                <td style={{ display: (permisosAsignados.includes('3') || permisosAsignados.includes('4') || rol === "3" || rol === "4" ? 'block' : 'none') }}>
                                    <button className='btn btn-primary' onClick={() => seleccionarUsuario(usuario, "Editar")} style={{ display: (permisosAsignados.includes('3') || rol === "3" || rol === "4" ? 'block' : 'none') }}>Editar</button> {""}
                                    <button className='btn btn-danger' onClick={() => seleccionarUsuario(usuario, "Eliminar")} style={{ display: (permisosAsignados.includes('4') || rol === "4" ? 'block' : 'none') }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={modalInsertar}>
                    <ModalHeader>Registrar usuario</ModalHeader>
                    <ModalBody>
                        <div className='form-group'>
                            <label>Nombre</label>
                            <input type="text" className='form-control' name="nombre" onChange={handleChange} />
                            <label>Apellidos</label>
                            <input type="text" className='form-control' name="apellidos" onChange={handleChange} />
                            <label>Dirección</label>
                            <input type="text" className='form-control' name="direccion" onChange={handleChange} />
                            <label>Telefono</label>
                            <input type="text" className='form-control' name="telefono" onChange={handleChange} />
                            <label>Email</label>
                            <input type="text" className='form-control' name="email" onChange={handleChange} />
                            <label>Edad</label>
                            <input type="number" className='form-control' name="edad" onChange={handleChange} />
                            <label>Rol</label>
                            <Select options={roles} name="idRol" onChange={handleChangeSelect} />
                            {/* <label>Permiso</label>
                            <Select options={permisos} name="idPermiso" onChange={handleChangeSelectPermiso} /> */}
                            {/* <input type="text" className='form-control' name="permiso" onChange={handleChange} /> */}
                            <label>Nombre Usuario</label>
                            <input type="text" className='form-control' name="nombreUsuario" onChange={handleChange} />
                            <label>Contraseña</label>
                            <input type="text" className='form-control' name="clave" onChange={handleChange} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={() => peticionPost()}>Insertar</button> {"  "}
                        <button className='btn btn-danger' onClick={() => openCloseModal()}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={modalEditar}>
                    <ModalHeader>Editar usuario</ModalHeader>
                    <ModalBody>
                        <div className='form-group'>
                            <label>Id</label>
                            <input type="text" className='form-control' name="nombre" readOnly value={usuarioSeleccionado && usuarioSeleccionado.idUsuario} />
                            <label>Nombre</label>
                            <input type="text" className='form-control' name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} />
                            <label>Apellidos</label>
                            <input type="text" className='form-control' name="apellidos" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellidos} />
                            <label>Dirección</label>
                            <input type="text" className='form-control' name="direccion" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.direccion} />
                            <label>Telefono</label>
                            <input type="text" className='form-control' name="telefono" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.telefono} />
                            <label>Email</label>
                            <input type="text" className='form-control' name="email" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.email} />
                            <label>Edad</label>
                            <input type="number" className='form-control' name="edad" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.edad} />
                            <label>Rol</label>
                            <Select options={roles} defaultValue={selectedOptionRol} name="idRol" onChange={handleChangeSelect} />
                            {/* <label>Permiso</label>
                            <Select
                                options={permisos}
                                defaultValue={selectedOptionPermiso}
                                isMulti
                                name="idPermiso"
                                onChange={handleChangeSelectPermiso} /> */}
                            <label>Nombre Usuario</label>
                            <input type="text" className='form-control' name="nombreUsuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombreUsuario} />
                            <label>Contraseña</label>
                            <input type="text" className='form-control' name="clave" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.clave} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={() => peticionPut()}>Guardar</button> {"  "}
                        <button className='btn btn-danger' onClick={() => openCloseModalEditar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEliminar}>
                    <ModalBody>
                        ¿Está seguro que desea eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombreUsuario}?
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => peticionDelete()}>Si</button>
                        <button className='btn btn-secondary' onClick={() => openCloseModalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );

}

export default GestionUsuarios;