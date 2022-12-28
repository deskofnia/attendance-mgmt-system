import './css/UserList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IRequest } from '../Interfaces/commonInterfaces';

export const Request = () => {
  
  
    const [request, setRequests] = useState<IRequest[]>([]);
    
    const navigate = useNavigate();

    // const getUser = async ()=>{
    //     await axios({
    //     method: "get",
    //     url: "http://localhost:5000/api/user/finduser",
    //     }).then((res) =>{
    //     localStorage.setItem('userid', res.data.user._id);
    //   });
    // }
    // getUser();

    
    useEffect(() => {
        
        getData();
    }, []);

    async function dashboard() {
      navigate(`/admin/${localStorage.getItem('adminId')}`);
    }

    const getData = async ()=>{
        await axios({
          method: "get",
          url: "http://localhost:5000/api/admin/requestlist",
          // data: { userid: localStorage.getItem("userid"), },
        }).then((res) =>{
          // console.log(res);
          setRequests(res.data.data);
        });
      }

  

  async function acceptReq (id:string) {

    await axios({
      method: "post",
      url: `http://localhost:5000/api/user/changerequest?id=${id}`,
      data: { status: 'Full Day'},
    }).then((res)=> {
        getData();
    });
  }

  async function rejectReq (id:string) {
    await axios({
      method: "post",
      url: `http://localhost:5000/api/user/changerequest?id=${id}`,
      data: { status: 'Half Day'},
    }).then((res)=> {
        getData();
    });
  }

  return (
    <div >
        <h1>User Requests</h1>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Request ID</th>
                    <th scope="col">Attendance ID</th>
                    <th scope="col">Status</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody >
            {
                request.map((user, index) => {
                    return (
                        <tr className='active-row' key={index}>
                            <td>{index + 1}</td>
                            <td>{user.user_id}</td>
                            <td>{user._id}</td>
                            <td>{user.status}</td>
                            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => acceptReq(request[index]?._id)} > Accept </button></td>
                            <td><button onClick={(e: React.SyntheticEvent<EventTarget>) => rejectReq(request[index]?._id)} > Reject </button></td>
                            {/* <td><button onClick={()=>redirect(user._id)}>Show Attendance</button></td> */}
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
