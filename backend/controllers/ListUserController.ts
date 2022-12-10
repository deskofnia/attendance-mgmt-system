import { Request, RequestHandler, Response } from 'express';
import list from '../services/ListAllUsers';

export  const ListUsers: RequestHandler = async (req: Request, res: Response)=> {
    list(req, res);
}