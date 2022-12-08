import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>SignIn</Link>
        <Link to='/signup'>SignUp</Link>
      </nav>
    </div>
  );
}

export default Nav;