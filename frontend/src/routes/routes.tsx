import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";
import UserDashboard from "../components/UserDashboard";

function Myroutes() {
    return (
      <div>
        <Routes>
          <Route path='/' element={ <h1>Home</h1> } />
          <Route path='signup' element={<SignUp/>}/>
          <Route path='login' element={<LogIn/>}/>
          <Route path="login/admin" element={<AdminDashboard/>}/>
          <Route path="login/user" element={<UserDashboard/>}/>
        </Routes>
      </div>
  );
};
  
  export default Myroutes;