import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { Attendance } from "../components/Attendance";
import { ClockInAndOut } from "../components/ClockInClockOut";
import { Home } from "../components/Home";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";
import UserDashboard from "../components/UserDashboard";
import { UserList } from "../components/UsersList";

function Myroutes() {
    return (
      <div>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path="/admin/:id" element={<AdminDashboard/>}/>
          <Route path="/user/:id" element={<UserDashboard/>}/>
          <Route path="/userslist" element={<UserList/>}/>
          <Route path="/user/attendance" element={<ClockInAndOut/>}/>
          <Route path="/user/attendance/:id" element={<Attendance/>}/>
        </Routes>
      </div>
  );
};

export default Myroutes;