import {Router} from 'express';
import { ListUsers } from '../controllers/ListUserController';
import {LogIn} from '../controllers/LoginController';
import {SignUp} from '../controllers/RegisterController';
import {FindOneUser} from '../controllers/FindOneUserController';
import { AttendanceList } from '../controllers/ListAttendanceController';
import { AddAttendance } from '../controllers/AddAttendanceController';
import { EditStatus } from '../controllers/EditStatusController';
import UpdateAttendance from '../services/UpdateAttendance';

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);
routes.get('/userslist', ListUsers);
routes.get('/finduser/:id', FindOneUser);
routes.get('/user/attendance', AttendanceList);
routes.post('/user/addattendance', AddAttendance);
routes.put('/user/updateattendance', UpdateAttendance);
routes.route('/editstatus').put(EditStatus);



export default routes;