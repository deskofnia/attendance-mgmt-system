import { Request, RequestHandler, Response } from 'express';
import login from '../services/UserLogin';

export  const LogIn: RequestHandler = async (req: Request, res: Response)=> {
    login(req, res);
}