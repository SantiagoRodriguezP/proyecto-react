import React,{ useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';


function PermisosAsignados() {
    const baseUrl = "https://localhost:44370/api/permisosAsignados";
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data.permisosAsignados);
                console.log(response.data.permisosAsignados);
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <>
         <Menu/>
         <div className="container" style={{float:'right', width:'85%'}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Rol</th>
                            <th>Permiso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(permisos => (
                                <tr key={permisos.idPermisoAsignado}>
                                    <td>{permisos.idPermisoAsignado}</td>
                                    <td>{permisos.rol}</td>
                                    <td>{permisos.permiso}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default  PermisosAsignados;