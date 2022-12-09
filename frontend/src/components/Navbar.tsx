import { Link } from 'react-router-dom';
import './css/Navbar.css';


function Nav() {
  return (
    <nav className='nav'>
      <Link className='nav-link' to='/'>Home</Link>
      <Link className='nav-link' to='/login'>SignIn</Link>
      <Link className='nav-link' to='/signup'>SignUp</Link>
    </nav>
  );
}

export default Nav;

