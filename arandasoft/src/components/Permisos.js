import React,{ useState, useEffect } from "react";
import Menu from './Menu';
import axios from 'axios';


function Permisos() {
    const baseUrl = "https://localhost:44370/api/permisos";
    const [data, setData] = useState([]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data.permisos);
                console.log(response.data.permisos);
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
                            <th>Permiso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(permisos => (
                                <tr key={permisos.idPermiso}>
                                    <td>{permisos.idPermiso}</td>
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

export default Permisos;