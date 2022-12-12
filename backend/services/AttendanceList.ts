import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function attendacelist(req: Request, res: Response) {
    await Attendance.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error occured" });
        })
}