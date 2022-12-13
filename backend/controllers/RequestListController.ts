import { Request, RequestHandler, Response } from 'express';
import reqlist from '../services/ReqList';

export  const ReqList: RequestHandler = async (req: Request, res: Response)=> {
    reqlist(req, res);
}