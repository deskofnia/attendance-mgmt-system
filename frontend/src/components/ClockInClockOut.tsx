import axios from 'axios';
import { useEffect, useState } from 'react'
import { IAttendance } from '../Interfaces/commonInterfaces';
// import './css/ClockInAndOut.css';
import './css/UserList.css';


export const ClockInAndOut = () => {
  
  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");

  const toggle = () => {
    if(buttonText==="Clock In")
    {
      addAttendance();
      setButtonText("Clock Out");
    }
    else{
      updateAttendance()
      setButtonText("Clock In"); 
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api/user/attendance",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
    }).then((res) =>{
        setAttendance(res.data);
    });
  }

  async function addAttendance () {

    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { date: new Date(), entry: new Date(), id: localStorage.getItem("_id")},
    }).then((res)=> {
      console.log(res);
      getData();
    });
  }
  async function updateAttendance() {
    let id = localStorage.getItem("_id");
    await axios({
      method: "put",
      url: `http://localhost:5000/api/user/updateattendance?${id}`,
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { exit: new Date() },
    }).then((res)=> {
        console.log(res);
        getData();
    });
}

  return (
    <div> 
        <button onClick={() => toggle()}>{buttonText}</button>       
        <table >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Entry Time</th>
                    <th scope="col">Exit Time</th>
                    {/* <th scope="col">ID</th> */}
                </tr>
            </thead>
            <tbody>
            {
                attendance.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.date}</td>
                            <td>{data.entry}</td>
                            <td>{data.exit}</td>
                        </tr>

                    )
                })
            }
            </tbody>
        </table>
    </div>
  )
}