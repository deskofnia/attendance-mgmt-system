import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { IAttendance } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';




export const ClockInAndOut = () => {

  const now = new Date();
  const clockInHours = () => now.getHours()*60 + now.getMinutes();
  const clockOutHours = ()=> now.getHours()*60 + now.getMinutes();
  // eslint-disable-next-line no-useless-concat
  const hours = () =>  'hrs:'+now.getHours() + ':' + 'mins:'+now.getMinutes()+'\nlat:'+localStorage.getItem("lat") + '\nlong:'+localStorage.getItem("long");
  const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
  // const navigate = useNavigate();
  async function geoLocation(){
    navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    localStorage.setItem("lat", latitude.toString());
    localStorage.setItem("long", longitude.toString());
  });
}
  // eslint-disable-next-line no-useless-concat
 

  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");
  const [effectiveHrs, setEffectiveHrs] = useState(0);
  const [status, setStatus] = useState("");
  const [req, setReq] = useState("Request");
  const [clockInTime, setClockInTime] = useState(0);
  const [clockOutTime, setClockOutTime] = useState(0)

  useEffect(() => {
    getData();
  }, []);

 

  const toggle = async () => {
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/dayattendance",
      data: { user_id: localStorage.getItem("userid"), date: date},
    }).then((res) => {

      if(res.data.length === 0 ){

        if(buttonText==="Clock In")
          {
            geoLocation();
            addAttendance();
            setButtonText("Clock Out");
            setClockInTime(clockInHours());
          }
      }
      else{
        if(buttonText==="Clock Out")
          {  
            geoLocation();
            updateAttendance()
            setButtonText("Clock In");
            setClockOutTime(clockOutHours());
            

            const totalHours = Number(clockOutTime) - Number(clockInTime);
            setEffectiveHrs(totalHours);

            if(totalHours < 5)
            {
              setStatus("Absent");
            }
            else if(totalHours > 5 && totalHours < 9)
            {
              setStatus("Half Day");
            }
            else if(totalHours > 9)
            {
              setStatus("Full Day");
            }
          }
      }
    });
          
  }

  const getData = async ()=>{
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/monthlyattendance",
      data: { user_id: localStorage.getItem("userid")},
    }).then((res) =>{
      // console.log(res);
      setAttendance(res.data);
    });
  }

  async function issueReq(id:string){
    if(req === "Request"){
      await axios({
        method: "post",
        url: 'http://localhost:5000/api/user/issuerequest',
        data: { attendance_id: id, user_id: localStorage.getItem("userid")},
      }).then((res)=> {
        setReq("Requested");
        getData();
      })
      .catch((err)=> console.log(err));
    }
  }
  async function addAttendance () {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
      data: { date: date, entry: hours, user_id: localStorage.getItem("userid")},
    }).then((res)=> {
      localStorage.setItem('attendanceid', res.data.user._id);
      getData();
    })
    .catch((err)=> console.log(err))
  }
  async function updateAttendance() {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/updateattendance',
      data: { exit: hours, id:localStorage.getItem('attendanceid')},
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
                            <td>{effectiveHrs}</td>
                            <td>{status}</td>
                            <td><button onClick={()=>issueReq(data._id)}>{req}</button></td>
                        </tr>
                    )
                })
              }
            </tbody>
        </table>
    </div>
  )
}





