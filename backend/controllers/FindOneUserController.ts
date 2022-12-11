import { Request, RequestHandler, Response } from 'express';
import findone from '../services/FindOneUser';


export  const FindOneUser: RequestHandler = async (req: Request, res: Response)=> {
    findone(req, res);
}