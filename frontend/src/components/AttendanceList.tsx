import axios from 'axios';
import { useState, useEffect } from 'react';
import { IAttendance } from '../Interfaces/commonInterfaces';

export const AttendanceList = () => {

  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  

  useEffect(() => {
    axios.get<IAttendance[]>("http://localhost:5000/api/user/attendance")
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
                attendance.map((data, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            {/* <td>{data.date}</td>
                            <td>{data.entry}</td>
                            <td>{data.exit}</td> */}
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        {/* <>
        <button onClick={dashboard} >Dashboard</button>
        </> */}
    </div>
  )
}

