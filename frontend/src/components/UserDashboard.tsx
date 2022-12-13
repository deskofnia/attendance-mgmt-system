import { ClockInAndOut } from "./ClockInClockOut";
// import './css/AdminDashboard.css';
import Header from "./Header";

export default function UserDashboard() {

  return (
    <div>
      <Header/>
      <h1>User Panel</h1>
      <ClockInAndOut/>
    </div>
  );
}