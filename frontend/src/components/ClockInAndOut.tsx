// import axios from 'axios';
// import React, { useState } from 'react'
// import { IAttendance } from '../Interfaces/commonInterfaces';
// import Moment from 'react-moment';

// export const ClockInAndOut = () => {

//     // const [date, setDate] = useState(new Date());

//     const [buttonText, setButtonText] = useState("Clock In");

//     const toggle = () => {
//       if(buttonText==="Clock In")
//       {
        
//         axios.post("http://localhost:5000/api/user/addattendance", {date: new Date(), entry: new Date()})
//         .then((res) => {
          
//       });

//       setButtonText("Clock Out");
//     }
//     else{

//       axios.post("http://localhost:5000/api/user/updateattendance", {exit: new Date()})
//         .then((res) => {
//           console.log(res);
//       });
      
//       setButtonText("Clock In"); 
//     }
    
//   return (
//     <div>
//         <button onClick={toggle}>{buttonText}</button>
//     </div>
//   )
// } 