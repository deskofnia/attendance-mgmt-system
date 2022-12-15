import { Request, RequestHandler, Response } from 'express';
import monthattendance from '../services/MonthAttendance';

export  const MonthAttendance: RequestHandler = async (req: Request, res: Response)=> {
    monthattendance(req, res);
}