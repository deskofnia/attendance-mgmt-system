import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './css/UserDashboard.css';

export default function UserDashboard() {
  const [isLoggedIn, setIsLoggedIn ] = useState(true);
  const navigate = useNavigate();
  
  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <div>
      <header className="Header">
      <h3 className="Logo" >User Panel</h3>
        <nav className="Nav">
          <Link to="profile">Profile</Link>
          <Link to="changepassword">Change Password</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      {/* <Outlet/> */}
    </div>
    
  );
}




// const [isNavVisible, setNavVisibility] = useState(false);
  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 700px)");
  //   // mediaQuery.addListener();
  //   mediaQuery.addEventListener("onchange", ()=>{
  //     handleMediaQueryChange(mediaQuery);
  //   })
  //   // handleMediaQueryChange(mediaQuery);

  //   return () => {
  //     mediaQuery.removeEventListener("onchange", ()=>{
  //       handleMediaQueryChange(mediaQuery);
  //     });
  //   };
  // }, []);

  // const handleMediaQueryChange = (mediaQuery: MediaQueryList) => {
  //   if (mediaQuery.matches) {
  //     setIsSmallScreen(true);
  //   } else {
  //     setIsSmallScreen(false);
  //   }
  // };

  // const toggleNav = () => {
  //   setNavVisibility(!isNavVisible);
  // };