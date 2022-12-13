import { Link } from "react-router-dom";
import './css/AdminDashboard.css';
import Header from "./Header";

export default function AdminDashboard() {
  return (
    <div>
      <Header />
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Admin Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <i className="fas fa-home"></i>
                <Link className="sidebarLink" to="/admin">
                  Home
                </Link>
              </li>
              <li className="sidebarListItem">
                <i className="fas fa-user"></i>
                <a className="sidebarLink" href="/userslist">
                  Users
                </a>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Contact</h3>
            <p>Email: info@biz4group.com</p>
            <p>Ph. No.: +1 (614)329-6463</p>
            <p>Location: 7380 W Sand Lake Rd, #500, Orlando, FL 32819, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
}