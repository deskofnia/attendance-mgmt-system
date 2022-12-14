import axios from 'axios';
import { useEffect, useState } from 'react';
import { IAttendance } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';


export const ClockInAndOut = () => {

  const now = new Date();
  // eslint-disable-next-line no-useless-concat
  const hours = 'hrs:'+now.getHours() + ':' + 'mins:'+now.getMinutes()+'\nlat:'+localStorage.getItem("lat") + '\nlong:'+localStorage.getItem("long");
  const date = now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear();
  const clockInHours = () => (now.getHours()*60 + now.getMinutes())/60;
  const clockOutHours = () => (now.getHours()*60 + now.getMinutes())/60;

   async function geoLocation(){
      navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem("lat", latitude.toString());
      localStorage.setItem("long", longitude.toString());
    });
  }

  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");
  const [effectiveHrs, setEffectiveHrs] = useState(0);

  const toggle = async () => {
    if(buttonText==="Clock In")
    {
      localStorage.setItem("ClockInTime", clockInHours().toString()) ;
      await geoLocation();
      addAttendance();
      setButtonText("Clock Out");
      // localStorage.removeItem("lat");
      // localStorage.removeItem("long");
    }
    else if(buttonText==="Clock Out")
    {  
      localStorage.setItem("ClockOutTime", clockOutHours().toString()) ;
      await geoLocation();
      updateAttendance()
      setButtonText("Clock In");
      

      const hrs1 = Number(localStorage.getItem("ClockOutTime")).toPrecision(2);
      const hrs2 = Number(localStorage.getItem("ClockInTime")).toPrecision(2);

      const totalHours = Number(hrs1) - Number(hrs2);
      setEffectiveHrs(totalHours);
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
      data: { user_id: localStorage.getItem("userid")},
    }).then((res) =>{
      setAttendance(res.data);
    });
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
                        </tr>
                    )
                })
              }
            </tbody>
        </table>
    </div>
  )
}