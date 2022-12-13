import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
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
        </Routes>
      </div>
  );
};

export default Myroutes;