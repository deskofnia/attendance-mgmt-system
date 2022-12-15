import axios from 'axios';
import { useEffect, useState } from 'react'
import { IRequest } from '../Interfaces/commonInterfaces';
import './css/IssueRequest.css';


export const IssueRequest = () => {

  const [ request, setRequest] = useState<IRequest[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    await axios({
      method: "get",
      url: "http://localhost:5000/api/user/requestlistbyid",
      data: { user_id: localStorage.getItem("userid"), },
    }).then((res) =>{
      // console.log(res);
      setRequest(res.data);
    });
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
                    <th scope="col">Remarks</th>
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
                            <td> <input type="text" name="" id="" />{data.remarks}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  )
}