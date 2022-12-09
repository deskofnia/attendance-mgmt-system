import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>SignIn</Link>
      <Link to='/signup'>SignUp</Link>
    </nav>
  );
}

export default Nav;

