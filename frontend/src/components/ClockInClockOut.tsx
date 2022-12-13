import axios from 'axios';
import { useEffect, useState } from 'react'
import { IAttendance } from '../Interfaces/commonInterfaces';
// import './css/ClockInAndOut.css';
import './css/UserList.css';


export const ClockInAndOut = () => {
  
  const now = new Date();
  const hours = now.getHours() + ':' + now.getMinutes();
  const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();

  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");

  const toggle = () => {
    if(buttonText==="Clock In")
    {
      addAttendance();
      setButtonText("Clock Out");
    }
    else if(buttonText==="Clock Out"){
      updateAttendance()
      setButtonText("Clock In"); 
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/attendance",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { user_id: localStorage.getItem("id")},
    }).then((res) =>{
        setAttendance(res.data);
    });
  }

  async function addAttendance () {

    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { date: date, entry: hours, user_id: localStorage.getItem("id")},
    }).then((res)=> {
      // console.log(res);
      localStorage.setItem('attendanceid', res.data.user._id);
      getData();
    });
  }
  async function updateAttendance() {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/updateattendance',
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { exit: hours, id:localStorage.getItem('attendanceid')},
    }).then((res)=> {
        localStorage.removeItem('attendanceid');
        getData();
    })
    .catch((err)=> console.log(err))
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