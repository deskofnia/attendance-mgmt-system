import axios from 'axios';
import { useEffect, useState } from 'react'
import { IRequest } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';


export const IssueRequest = () => {

  const [request, setRequest] = useState<IRequest[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/requestlist",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { user_id: localStorage.getItem("userid"), },
    }).then((res) =>{
      setRequest(res.data);
    });
  }

  async function addAttendance () {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
      data: { date: date, entry: hours, user_id: localStorage.getItem("userid")},
    }).then((res)=> {
      localStorage.setItem('attendanceid', res.data.user._id);
    })
    .catch((err)=> console.log(err))
  }
  async function updateAttendance() {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/updateattendance',
      data: { exit: hours, id:localStorage.getItem('attendanceid')},
    }).then((res)=> {
        localStorage.removeItem('attendanceid');
    })
    .catch((err)=> console.log(err))
}

  return (
    <div> 
        <button onClick={() => toggle()}>{buttonText}</button>
        <table  className="styled-table" >
        
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
                        <tr className="active-row" key={index}>
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