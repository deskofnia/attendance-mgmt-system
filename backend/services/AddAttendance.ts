import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';


export default async function addAttendance(req: Request, res: Response){
    console.log("inside service");

    const { user_id, date, entry, exit} = req.body;

    const attendance = await Attendance.create({ user_id, date, entry, exit});

    // Save
    await attendance.save((err, user) => {
        if (err) {
            return res.status(400).json({ msg: (err) });
        }
        res.json({ user });
    })

    console.log("Attendance Added", attendance);
}