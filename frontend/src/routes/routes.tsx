import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { AttendanceList } from "../components/AttendanceList";
import { ClockInAndOut } from "../components/ClockInAndOut";
import { Home } from "../components/Home";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";
import UserDashboard from "../components/UserDashboard";
import { UserList } from "../components/UsersList";

function Myroutes() {
    return (
      <div>
        <Routes>
          <Route path='/' element={ <ClockInAndOut/> } />
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<LogIn/>}/>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="user" element={<UserDashboard/>}/>
          <Route path="userlist" element={<UserList/>}/>
          <Route path="user/attendance" element={<AttendanceList/>}/>
        </Routes>
      </div>
  );
};

export default Myroutes;