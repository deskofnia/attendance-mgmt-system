import './css/List2.css';
import { useEffect, useState } from 'react';
import { IUser } from '../Interfaces/commonInterfaces';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export const List = () => {

  const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();
  useEffect(() => {
    axios.get<IUser[]>("http://localhost:5000/api/list")
    .then((res) =>{
        console.log(res);
        setUsers(res.data);
    });
  }, []);
  async function dashboard() {
    navigate('/admin')
  }

  return (
    <div className=''>
        <table id="keywords" cellSpacing="0" cellPadding="0">
            <thead className=''>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody className=''>
            {
                users && users.map((user, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user._id}</td>
                            <td>{user.status}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        <>
        <button onClick={dashboard} >Dashboard</button>
        {/* <a href="/admin" >Dashboard</a>  */}
        </>
    </div>
  )
}
