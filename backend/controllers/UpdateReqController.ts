import { Request, RequestHandler, Response } from 'express';
import updateReqAttendance from '../services/UpdateReqAttendance';


export  const UpdateReqAttendance: RequestHandler = async (req: Request, res: Response)=> {
    updateReqAttendance(req, res);
}