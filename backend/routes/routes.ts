import {Router} from 'express';
import { ListUsers } from '../controllers/ListUserController';
import {LogIn} from '../controllers/LoginController';
import {SignUp} from '../controllers/RegisterController';
import {FindOneUser} from '../controllers/FindOneUserController';

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);
routes.get('/list', ListUsers);
routes.get('/finduser/:id', FindOneUser)


export default routes;