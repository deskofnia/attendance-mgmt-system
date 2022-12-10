import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/AdminDashboard.css';

export default function AdminDashboard() {

  const [isLoggedIn, setIsLoggedIn ] = useState(true);
  const navigate = useNavigate();
  
  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <header className="Header">
      <h1 className="panel" >Admin Panel</h1>
      <h3>Users</h3>
        
    </header>
  );
}
