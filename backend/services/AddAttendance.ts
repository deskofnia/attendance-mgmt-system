import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';


export default async function addAttendance(req: Request, res: Response){

    const { user_id, date, entry, clockIn } = req.body;
    // console.log(user_id, date, entry);
    console.log("Inside addAttendance");
    const attendance = await Attendance.create({ user_id, date, entry, exit:"", clockInHours:clockIn, clockOutHours:0, totalHours:0, status:"", fromdate:"", todate:""  });

    // Save
    await attendance.save((err, user) => {
        if (err) {
            return res.status(400).json({ msg: (err) });
        }
        res.send(user);
    })

    console.log("Attendance Added", attendance);
}