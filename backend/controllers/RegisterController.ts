import { Request, RequestHandler, Response } from 'express';
import signup from '../services/UserSignup'

export  const SignUp: RequestHandler = async (req: Request, res: Response)=> {
    signup(req, res);
}