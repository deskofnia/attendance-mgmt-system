import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { Home } from "../components/Home";
import { List } from "../components/UsersList";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";
import UserDashboard from "../components/UserDashboard";

function Myroutes() {
    return (
      <div>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<LogIn/>}/>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="user/user" element={<UserDashboard/>}/>
          <Route path="list" element={<List/>}/>
        </Routes>
      </div>
  );
};
  
  export default Myroutes;