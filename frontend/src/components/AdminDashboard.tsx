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
      <h1 className="Logo" >Admin Panel</h1>
      {/* <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      > */}
        <nav className="Nav">
          <a href="/">Profile</a>
          <a href="/">Change Password</a>
          <button onClick={logout}>Logout</button>
        </nav>
      {/* </CSSTransition> */}
      {/* <button onClick={toggleNav} className="Burger">
        Hello 🍔
      </button> */}
    </header>
  );
}
