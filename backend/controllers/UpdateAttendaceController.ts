import { Request, RequestHandler, Response } from 'express';
import updateAttendance from '../services/UpdateAttendance';


export  const UpdateAttendance: RequestHandler = async (req: Request, res: Response)=> {
    updateAttendance(req, res);
}