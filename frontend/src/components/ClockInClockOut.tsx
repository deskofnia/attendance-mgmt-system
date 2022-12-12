import axios from 'axios';
import { useEffect, useState } from 'react'
import { IAttendance } from '../Interfaces/commonInterfaces';


export const ClockInAndOut = () => {

    
  
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api//user/attendance",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
    }).then((res) =>{
        setAttendance(res.data);
        });
  }

  async function addAttendance (id:any) {

    await axios({
      method: "post",
      url: `http://localhost:5000/api/addattendance?id=${id}`,
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { status: 'Active'},
    }).then((res)=> {
      getData();
    });
  }
  async function updateAttendance(id:any) {
    await axios({
      method: "put",
      url: `http://localhost:5000/api/updateattendance?id=${id}`,
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
                attendance.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.date}</td>
                            <td>{user.entry}</td>
                            <td>{user._id}</td>
                            <td>{user.status}</td>
                            {/* <td>
                                <button onClick={(e: React.SyntheticEvent<EventTarget>) => addAttendance(attendance[index]?._id)} > Active </button>
                                <button onClick={(e: React.SyntheticEvent<EventTarget>) => updateAttendance(attendance[index]?._id)} > Inactive </button>
                            </td> */}
                            
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
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