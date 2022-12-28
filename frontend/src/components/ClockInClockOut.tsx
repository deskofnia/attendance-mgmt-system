import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAttendance } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';




export const ClockInAndOut = () => {

  const now = new Date();
  const clockInHours = () => now.getHours()*60 + now.getMinutes();
  const clockOutHours = ()=> now.getHours()*60 + now.getMinutes();
  // eslint-disable-next-line no-useless-concat
  const hours = () =>  'hrs:'+now.getHours() + ':' + 'mins:'+now.getMinutes()+'\nlat:'+localStorage.getItem("lat") + '\nlong:'+localStorage.getItem("long");
  const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
  const navigate = useNavigate();
  
  // eslint-disable-next-line no-useless-concat
 

  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");
  const [req, setReq] = useState("Request");

  useEffect(() => {
    getData();
  }, []);

 

  const toggle = async () => {
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/dayattendance",
      data: { user_id: localStorage.getItem("userid"), date: date},
    }).then((res) => {

      console.log("Day attendance===", res);

      if(res.data.length === 0 ){

        if(buttonText==="Clock In")
          {
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              localStorage.setItem("lat", latitude.toString());
              localStorage.setItem("long", longitude.toString());
            });

            addAttendance();
            setButtonText("Clock Out");
          }
      }
      else{
        if(buttonText==="Clock Out")
          {  
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              localStorage.setItem("lat", latitude.toString());
              localStorage.setItem("long", longitude.toString());
            });
            updateAttendance()
            setButtonText("Clock In");
            localStorage.removeItem("");
          }
      }
    });
          
  }

  const getData = async ()=>{
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/attendance",
      data: { user_id: localStorage.getItem("userid")},
    }).then((res) =>{
      console.log("Attendance response ============",res);
      setAttendance(res.data.data);
    });
  }

  async function issueReq(id:string){
    if(req === "Request"){
      await axios({
        method: "post",
        url: 'http://localhost:5000/api/user/issuerequest',
        data: { attendance_id: id, user_id: localStorage.getItem("userid")},
      }).then((res)=> {
        console.log("Issue request ============",res);
        setReq("Requested");
        getData();
      })
      .catch((err)=> console.log(err));
    }
  }
  async function addAttendance () {
    const hrs = hours();
    const clockIn = clockInHours();
    localStorage.setItem("clockIn", clockIn.toString());
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
      data: { date: date, entry: hrs, user_id: localStorage.getItem("userid"), clockIn:clockIn },
    }).then((res)=> {
      console.log("Add attendance =========",res);
      localStorage.setItem('attendanceid', res.data.user._id);
      getData();
    })
    .catch((err)=> console.log(err))
  }
  async function updateAttendance() {
    const hrs = hours();
    const clockOut = clockOutHours();
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/updateattendance',
      data: { exit: hrs, clockOut:clockOut, id:localStorage.getItem('attendanceid'), clockIn:localStorage.getItem('clockIn')},
    }).then((res)=> {
        console.log("update attendancae ============",res);
        localStorage.removeItem('attendanceid');
        getData();
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
                    <th scope="col">Effective Hours</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              {
                attendance.map((data, index) => {
                    return(
                        <tr className="active-row" key={index}>
                            <td>{index + 1}</td>
                            <td>{data.date}</td>
                            <td>{data.entry}</td>
                            <td>{data.exit}</td>
                            <td>{data.totalHours}</td>
                            <td>{data.status}</td>
                            <td> {data.status !== 'Full Day'? <button onClick={()=>issueReq(data._id)}>{req}</button>: "" } </td>
                        </tr>
                    )
                })
              }
            </tbody>

            <button onClick={() =>navigate(`/user/${localStorage.getItem("userid")}/issuerequest`) }>Check Request Remarks</button>
        </table>
    </div>
  )
}





