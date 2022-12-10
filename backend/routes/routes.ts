import {Router} from 'express';
import { ListUsers } from '../controllers/ListUserController';
import {LogIn} from '../controllers/LoginController';
import {SignUp} from '../controllers/RegisterController';

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);
routes.post('/list', ListUsers);


export default routes;