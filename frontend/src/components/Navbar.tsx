import { Link } from 'react-router-dom';
// import { menuItems } from '../constants/menuItems';
// import {MenuItems} from '../components/MenuItems';


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


{/* <ul className="menus">
      {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul> */}