import axios from 'axios';
import { useState, useEffect } from 'react';
import { IAttendance } from '../Interfaces/commonInterfaces';

export const AttendanceList = () => {

  const [attendance, setAttendance] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/attendance")
    .then((res) =>{
        console.log(res);
        setAttendance(res.data);
    });
  }, []);

  return (
    <div className=''>
        <table id="keywords" cellSpacing="0" cellPadding="0">
            <thead className=''>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Entry time</th>
                    <th scope="col">Exit time</th>
                </tr>
            </thead>
            <tbody className=''>
            {
                // attendance.map((value, index) => {
                //     return (
                //         // <tr key={index}>
                //         //     <td>{index + 1}</td>
                //         //     <td>{value?.date}</td>
                //         //     <td>{value[index]?.entry}</td>
                //         //     <td>{value[index]?.exit}</td>
                //         // </tr>
                //     )
                // })
            }
            </tbody>
        </table>
        {/* <>
        <button onClick={dashboard} >Dashboard</button>
        </> */}
    </div>
  )
}

