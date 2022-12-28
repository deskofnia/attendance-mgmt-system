import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAttendance } from '../Interfaces/commonInterfaces';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const MonthlyAttendance = () => {

    const [attendance, setAttendance] = useState<IAttendance[]>([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async ()=>{
        await axios({
          method: "post",
          url: "http://localhost:5000/api/user/attendance",
          data: { user_id: localStorage.getItem("userid")},
        }).then((res) =>{
            setAttendance(res.data.data);
        });
      }

      const getMonthAttendance = async () => {
        await axios({
            method: "post",
            url: "http://localhost:5000/api/user/monthlyattendance",
            data: { user_id: localStorage.getItem("userid"), fromdate: startDate, todate: endDate},
          }).then((res) =>{
              setAttendance(res.data.data);
          });
      }

    return (
        <div>
            <h1>Monthly Attendance</h1>
            <button onClick={() => getMonthAttendance}>Get Attendance</button>
            <div className='datebox'>
                <div className='date1'>
                    <DatePicker 
                        selected={startDate}
                        onChange={(date:any) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        // isClearable={true}
                        placeholderText="From Date"
                        closeOnScroll={true}
                        className = 'red-border'
                    />
                </div>
                <div className='date2'>
                    <DatePicker
                        selected={endDate}
                        onChange={(date:any) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        // isClearable={true}
                        placeholderText="To Date"
                        closeOnScroll={true}
                    />
                </div>
            </div>
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
