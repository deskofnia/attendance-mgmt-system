import { Link } from 'react-router-dom';
import menuItems from '../constants/loginOptions';


function Nav() {
  return (
    <nav>
        <ul className="menus">
        {menuItems.map((menu:any, index:number) => {
          return (
            <li className="menu-items" key={index}>
              <a href={menu.url}>{menu.title}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;


// <Link to='/'>Home</Link>
// <Link to='/login'>SignIn</Link>
// <Link to='/signup'>SignUp</Link>