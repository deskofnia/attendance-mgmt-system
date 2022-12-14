import { Request, RequestHandler, Response } from 'express';
import reqlistbyid from '../services/ReqListByUserId';


export  const ReqListById: RequestHandler = async (req: Request, res: Response)=> {
    reqlistbyid(req, res);
}