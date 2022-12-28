import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';
import { DATETIME } from '../utils/constant';


export default async function addAttendance(req: Request, res: Response){

    const { user_id, date, entry, clockIn } = req.body;
    // console.log(user_id, date, entry);
    console.log("Inside addAttendance");
    const attendance = await Attendance.create({ user_id, date, entry, exit:DATETIME.EXIT, clockInHours:clockIn, clockOutHours:DATETIME.CLOCK_OUT_HRS, totalHours:DATETIME.TOTAL_HRS, status:DATETIME.STATUS, fromdate:DATETIME.FROMDATE, todate:DATETIME.TODATE });

    // Save
    attendance.save((err, user) => {
        // console.log("Errorrrrrrrrr=====",err, "Userrrrrrrr===", user);
        if (err) {
            return res.status(400).json({ data:{}, success:false, message:err });
        }
        res.send({data:user, success:true, message:"Attendance Added Succesfully"});
    })

    // console.log("Attendance Added", attendance);
}