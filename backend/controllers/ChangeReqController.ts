import { Request, RequestHandler, Response } from 'express';
import changeReq from '../services/ChangeReqStatus';

export  const ChangeRequest: RequestHandler = async (req: Request, res: Response)=> {
    
    changeReq(req, res);
}