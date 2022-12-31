import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAttendance } from '../Interfaces/commonInterfaces';

export const Attendance = () => {

    const [attendance, setAttendance] = useState<IAttendance[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async ()=>{
        await axios({
          method: "post",
          url: "http://localhost:5000/api/user/attendance",
          headers: { authorization: 'Bearer ' + localStorage.getItem("token")},
          data: { user_id: localStorage.getItem("userid")},
        }).then((res) =>{
            setAttendance(res.data.data);
        });
      }

    return (
        <div>
            <h1>Attendance</h1>
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
                <button onClick={()=> navigate('/admin/userslist')}>Back</button>
            </table>
        </div>
    )
}
