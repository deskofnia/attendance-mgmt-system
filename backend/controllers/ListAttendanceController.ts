import { Request, RequestHandler, Response } from 'express';
import attendacelist from '../services/AttendanceList';
;

export  const AttendanceList: RequestHandler = async (req: Request, res: Response)=> {
    attendacelist(req, res);
}