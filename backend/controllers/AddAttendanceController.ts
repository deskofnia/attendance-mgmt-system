import { Request, RequestHandler, Response } from 'express';
import addAttendance from '../services/AddAttendance';


export  const AddAttendance: RequestHandler = async (req: Request, res: Response)=> {

    console.log("inside controller");
    
    addAttendance(req, res);
}