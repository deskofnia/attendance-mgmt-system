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
      <h1 className="Logo" >Admin Panel
      <nav className="Nav">
          <a href="/">Profile</a>
          <a href="/">Change Password</a>
          <button onClick={logout}>Logout</button>
        </nav>
      </h1>
        
    </header>
  );
}
