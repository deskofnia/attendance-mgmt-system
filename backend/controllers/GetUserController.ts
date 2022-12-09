import { Request, RequestHandler, Response } from 'express';
import getUser from '../services/GetUser';

export  const GetUser: RequestHandler = async (req: Request, res: Response)=> {
    getUser(req, res);
}