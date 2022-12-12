import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IUser } from '../Interfaces/commonInterfaces';


export const ClockInAndOut = () => {

    
  
  const [users, setUsers] = useState<IUser[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api/userslist",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
    }).then((res) =>{
        setUsers(res.data);
        console.log("Response UserList: ", res)
        });
    }

  async function dashboard() {
    navigate('/admin');
  }

  async function acceptReq (id:any) {

    await axios({
      method: "put",
      url: `http://localhost:5000/api/editstatus?id=${id}`,
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { status: 'Active'},
    }).then((res)=> {
      getData();
    });
  }
  async function rejectReq (id:any) {
    await axios({
      method: "put",
      url: `http://localhost:5000/api/editstatus?id=${id}`,
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { status: 'Inactive'},
    }).then((res)=> {
        getData();
    });
}

  return (
    <div className=''>
        <table >
            <thead className=''>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">ID</th>
                    <th scope="col">Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className=''>
            {
                users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                            <td>{user.status}</td>
                            <td>
                                <button onClick={(e: React.SyntheticEvent<EventTarget>) => acceptReq(users[index]?._id)} > Active </button>
                                <button onClick={(e: React.SyntheticEvent<EventTarget>) => rejectReq(users[index]?._id)} > Inactive </button>
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
  
  
  
  
  
  // const [date, setDate] = useState(new Date());

  //   const [buttonText, setButtonText] = useState("Clock In");

  //   const toggle = () => {
  //     if(buttonText==="Clock In")
  //     {
        
  //       axios.post("http://localhost:5000/api/user/addattendance", {date: new Date(), entry: new Date()})
  //       .then((res) => {
          
  //     });

  //     setButtonText("Clock Out");
  //   }
  //   else{

  //     axios.post("http://localhost:5000/api/user/updateattendance", {exit: new Date()})
  //       .then((res) => {
  //         console.log(res);
  //     });
      
  //     setButtonText("Clock In"); 
  //   }
  //   }
    
  // return (
  //   <div>
  //       <button onClick={toggle}>{buttonText}</button>
  //   </div>
  // )
}