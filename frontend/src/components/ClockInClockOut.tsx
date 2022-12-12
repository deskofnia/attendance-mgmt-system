import axios from 'axios';
import { useEffect, useState } from 'react'
import { IAttendance } from '../Interfaces/commonInterfaces';


export const ClockInAndOut = () => {
  
  const [attendance, setAttendance] = useState<IAttendance[]>([]);

  const [buttonText, setButtonText] = useState("Clock In");

  const toggle = (id:string) => {
    if(buttonText==="Clock In")
    {
      addAttendance();
      setButtonText("Clock Out");
    }
    else{
      updateAttendance(id)
      setButtonText("Clock In"); 
    }
  }

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

  async function addAttendance () {

    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/addattendance',
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { date: new Date(), entry: new Date()},
    }).then((res)=> {
      console.log(res);
      getData();
    });
  }
  async function updateAttendance(id:string) {
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
        <table >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Entry Time</th>
                    <th scope="col">Exit Time</th>
                    {/* <th scope="col">ID</th> */}
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                attendance.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.date.toString()}</td>
                            <td>{data.entry.toString()}</td>
                            <td>{data.exit.toString()}</td>
                            {/* <td>{data._id}</td> */}
                            <td><button onClick={() => toggle(attendance[index]?._id)}>{buttonText}</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  )
}