import './css/UserList.css';
import { useEffect, useState } from 'react';
import { IUser } from '../Interfaces/commonInterfaces';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<IUser[]>("http://localhost:5000/api/userslist")
    .then((res) =>{
        console.log(res);
        setUsers(res.data);
    });
  }, []);

  async function dashboard() {
    navigate('/admin');
  }

  return (
    <div className=''>
        <table id="keywords" cellSpacing="0" cellPadding="0">
            <thead className=''>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
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
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                            <td>{user.status}
                                <button>Act</button>
                                <button>InAct</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        <>
        <button onClick={dashboard} >Dashboard</button>
        </>
    </div>
  )
}
