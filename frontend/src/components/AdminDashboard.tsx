import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './css/AdminDashboard.css';

export default function AdminDashboard() {

  const [isLoggedIn, setIsLoggedIn ] = useState(true);
  const navigate = useNavigate();
  
  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <div>
      <h1>Admin Panel</h1>
      <Link to="profile">Users</Link>
      <Link to="changepassword">Request</Link>
      <Link to="changepassword">Change Password</Link>
      <button onClick={logout}>Logout</button>
    </div>

  );
}
