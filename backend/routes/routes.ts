import { Router } from 'express';
import { ListUsers } from '../controllers/ListUserController';
import { LogIn } from '../controllers/LoginController';
import { SignUp } from '../controllers/RegisterController';
import { FindOneUser } from '../controllers/FindOneUserController';
import { AttendanceList } from '../controllers/ListAttendanceController';
import { AddAttendance } from '../controllers/AddAttendanceController';
import { EditStatus } from '../controllers/EditStatusController';
import { UpdateAttendance } from '../controllers/UpdateAttendaceController';
import { ReqList } from '../controllers/RequestListController';
import { IssueReq } from '../controllers/IssueReqController';
import { ChangeRequest } from '../controllers/ChangeReqController';
import {ReqListById} from '../controllers/ReqListByUserId';
import { DayAttendance } from '../controllers/DayAttendanceController';
import { MonthAttendance } from '../controllers/MonthAttendanceController';
import { UpdateReqAttendance } from '../controllers/UpdateReqController';
import auth from '../middleware/auth';

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);
routes.get('/userslist', auth,ListUsers);
routes.get('/user/finduser',auth, FindOneUser);
routes.get('/admin/requestlist',auth, ReqList);
routes.post('/user/changerequest', auth, ChangeRequest)
routes.post('/user/issuerequest', auth, IssueReq);
routes.post('/user/attendance',auth, AttendanceList);
routes.post('/user/monthlyattendance', MonthAttendance);
routes.post('/user/dayattendance',auth, DayAttendance);
routes.post('/user/requestlistbyid',auth, ReqListById);
routes.post('/user/addattendance',auth, AddAttendance);
routes.route('/user/updateattendance').post(auth, UpdateAttendance);
routes.route('/user/updatereqattendance').post(auth, UpdateReqAttendance);
routes.route('/editstatus').put(auth, EditStatus);

export default routes;