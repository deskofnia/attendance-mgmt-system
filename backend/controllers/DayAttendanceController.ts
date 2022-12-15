import { Request, RequestHandler, Response } from 'express';
import dayattendance from '../services/DayAttendance';

export  const DayAttendance: RequestHandler = async (req: Request, res: Response)=> {
    dayattendance(req, res);
}