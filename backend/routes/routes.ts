import {Router} from 'express';
import { GetUser } from '../controllers/GetUserController';
import {LogIn} from '../controllers/LoginController';
import {SignUp} from '../controllers/RegisterController';

const routes = Router();

routes.get('/getuser/:id', GetUser);
routes.post('/register', SignUp);
routes.post('/login', LogIn);


export default routes;