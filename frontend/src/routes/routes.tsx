import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { Attendance } from "../components/Attendance";
import { ClockInAndOut } from "../components/ClockInClockOut";
import { Home } from "../components/Home";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";
import UserDashboard from "../components/UserDashboard";
import { Request } from "../components/Requests";
import { UserList } from "../components/UsersList";
import { IssueRequest } from "../components/IssueRequest";

function Myroutes() {
    return (
      <div>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path="/admin/:id" element={<AdminDashboard/>}/>
          <Route path="/user/:id" element={<UserDashboard/>}/>
          <Route path="/admin/userslist" element={<UserList/>}/>
          <Route path="/user/attendance" element={<ClockInAndOut/>}/>
          <Route path="/user/attendance/:id" element={<Attendance/>}/>
          <Route path="/user/issuerequest" element={<IssueRequest/>}/>
          <Route path="/admin/requests" element={<Request/>}/>
        </Routes>
      </div>
  );
};

export default Myroutes;