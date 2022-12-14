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

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);
routes.get('/userslist', ListUsers);
routes.get('/user/finduser', FindOneUser);
routes.get('/user/requestlist', ReqList);
routes.post('/user/changerequest', ChangeRequest)
routes.post('/user/issuerequest', IssueReq);
routes.post('/user/attendance', AttendanceList);
routes.post('/user/addattendance', AddAttendance);
routes.route('/user/updateattendance').post(UpdateAttendance);
routes.route('/editstatus').put(EditStatus);

export default routes;