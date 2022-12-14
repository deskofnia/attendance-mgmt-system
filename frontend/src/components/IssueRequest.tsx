import axios from 'axios';
import { useEffect, useState } from 'react'
import { IRequest } from '../Interfaces/commonInterfaces';
import './css/ClockInClockOut.css';


export const IssueRequest = () => {

  const [ request, setRequest] = useState<IRequest[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api/user/requestlist",
    //   headers: { authorization: `Bearer ${localStorage.getItem("token")}`,id: localStorage.getItem("_id") },
      data: { user_id: localStorage.getItem("userid"), },
    }).then((res) =>{
      console.log(res);
      setRequest(res.data);
    });
  }

  async function issueRequest () {
    await axios({
      method: "post",
      url: 'http://localhost:5000/api/user/issuerequest',
      data: {  user_id: localStorage.getItem("userid"), reason:'ggggg'},
    }).then((res)=> {
      console.log(res);
      localStorage.setItem('reqid', res.data.user._id);
    })
    .catch((err)=> console.log(err))
  }

  return (
    <div> 
        <table  className="styled-table" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Request Id</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">ID</th> */}
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                request.map((data, index) => {
                    return (
                        <tr className="active-row" key={index}>
                            <td>{index + 1}</td>
                            <td>{data.user_id}</td>
                            <td>{data._id}</td>
                            <td>{data.status}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  )
}