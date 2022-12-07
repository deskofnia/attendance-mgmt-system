import {Router} from 'express';

import LoginController from './';
import RegisterController from './';

const routes = Router();

router.get('/', );
router.post('/register', RegisterController);
router.post('/login', LoginController);


export default routes;