import { Link, useNavigate } from "react-router-dom";
import { ClockInAndOut } from "./ClockInClockOut";
import './css/AdminDashboard.css';
import Header from "./Header";

export default function AdminDashboard() {

  const navigate = useNavigate();
  
  const logout = () => {
    navigate('/login');
  }
  return (
    <div>
      <Header/>
      <h1>User Panel</h1>
      <ClockInAndOut/>
      {/* <Link to="profile">Profile</Link>
      <Link to="changepassword">Request</Link>
      <Link to="changepassword">Change Password</Link>
      <button onClick={logout}>Logout</button> */}
    </div>
  );
}