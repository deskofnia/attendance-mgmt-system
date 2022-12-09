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
          <Route path='login' element={<LogIn/>}>
            <Route path="admin" element={<h2>Admin</h2>}>
              {/* <Route path=":adminId" element={<AdminDashboard/>}/> */}
            </Route>
            <Route path="user" element={<h2>User</h2>}>
              {/* <Route path=":userId" element={<UserDashboard/>}/> */}
            </Route>
          </Route>
        </Routes>
      </div>
  );
};
  
  export default Myroutes;