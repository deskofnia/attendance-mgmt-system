import { Request, RequestHandler, Response } from 'express';
import attendancelist from '../services/AttendanceList';
;

export  const AttendanceList: RequestHandler = async (req: Request, res: Response)=> {
    attendancelist(req, res);
}