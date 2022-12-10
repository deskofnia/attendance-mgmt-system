import {Router} from 'express';
import {LogIn} from '../controllers/LoginController';
import {SignUp} from '../controllers/RegisterController';

const routes = Router();

routes.post('/register', SignUp);
routes.post('/login', LogIn);


export default routes;