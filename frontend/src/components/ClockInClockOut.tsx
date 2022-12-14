import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAttendance } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';

export const ClockInAndOut = () => {

  // eslint-disable-next-line no-useless-concat
  const now = new Date();
  const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();

  const geolocation = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem("lat", latitude.toString());
      localStorage.setItem("long", longitude.toString());
    });
  }

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
      headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
      data: { user_id: localStorage.getItem("userid"), date: date},
    }).then(async (res) => {

      console.log("Day attendance====", res);

      if(res.data.data.length === 0 ){
        if(buttonText==="Clock In")
        {
          await geolocation();
          setButtonText("Clock Out");
          addAttendance();
        }
      }
      else{
        if(buttonText==="Clock Out")
        {  
          await geolocation();
          setButtonText("Clock In");
          updateAttendance();
        }
      }
    });
          
  }

  const getData = async ()=>{
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/attendance",
      headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
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
        headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
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

    const now = new Date();
    const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
    const entryTime =  'hrs:'+now.getHours() + ':' + 'mins:'+now.getMinutes()+'\nlat:'+localStorage.getItem("lat")+'\nlong:'+localStorage.getItem("long");
    console.log("Entry Time=====", entryTime);
    const clockIn = now.getHours()*60 + now.getMinutes();
    localStorage.setItem("clockIn", clockIn.toString());

    
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
      headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
      data: { date: date, entry: entryTime, user_id: localStorage.getItem("userid"), clockIn:clockIn },
    }).then((res)=> {
      console.log("Add attendance =========",res);
      localStorage.setItem('attendanceid', res.data.data._id);
      getData();
    })
    .catch((err)=> console.log(err))
  }

  async function updateAttendance() {

    const now = new Date();
    const exitTime =  'hrs:'+now.getHours() + ':' + 'mins:'+now.getMinutes()+'\nlat:'+localStorage.getItem("lat")+ '\nlong:'+localStorage.getItem("long");
    const clockOut = now.getHours()*60 + now.getMinutes();
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/updateattendance',
      headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
      data: { exit: exitTime, clockOut:clockOut, id:localStorage.getItem('attendanceid'), clockIn:localStorage.getItem('clockIn')},
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


