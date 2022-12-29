import './css/UserList.css';
import { useEffect, useState } from 'react';
import { IUser } from '../Interfaces/commonInterfaces';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {
  
  
  const [users, setUsers] = useState<IUser[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function dashboard() {
    navigate(`/admin/${localStorage.getItem('adminId')}`);
  }

  const redirect = async (userid: string) => {
    localStorage.setItem('userid', userid);
    navigate(`/user/monthlyattendance/${userid}`);
  }

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api/userslist",
      headers: { authorization: 'Bearer ' + localStorage.getItem("token")}
    }).then((res) =>{
        setUsers(res.data.data);
      });
    }

  

  async function acceptReq (id:string) {

    await axios({
      method: "put",
      url: `http://localhost:5000/api/editstatus?id=${id}`,
      data: { status: 'active'},
    }).then((res)=> {
      getData();
    });
  }
  async function rejectReq (id:string) {
    await axios({
      method: "put",
      url: `http://localhost:5000/api/editstatus?id=${id}`,
      data: { status: 'inactive'},
    }).then((res)=> {
        getData();
    });
}

  return (
    <div >
        <h1>User List</h1>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody >
            {
                users.map((user, index) => {
                    return (
                        <tr className='active-row' key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                            <td>{user.status}</td>
                            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => acceptReq(users[index]?._id)} > Active </button></td>
                            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => rejectReq(users[index]?._id)} > Inactive </button></td>
                            <td><button onClick={()=>redirect(user._id)}>Show Attendance</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
            <button onClick={dashboard} >Dashboard</button>
        </table>
    </div>
  )
}
