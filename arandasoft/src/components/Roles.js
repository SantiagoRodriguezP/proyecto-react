import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import axios from 'axios';

function Roles() {
    const baseUrl = "https://localhost:44370/api/roles";
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data.roles);
                console.log(response.data.roles);
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <>
            <Menu />
            <div className="container" style={{ float: 'right', width: '85%' }}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(roles => (
                                <tr key={roles.idRol}>
                                    <td>{roles.idRol}</td>
                                    <td>{roles.nombre}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Roles;