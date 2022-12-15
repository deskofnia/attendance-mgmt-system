import { Attendance } from "../models/attendanceModel";
import { Request, Response } from 'express';

export default async function updateAttendance(req: Request, res: Response){
    const { exit, clockOut, clockIn, fromdate, todate } = req.body;
    const id = req.body.id;
    let status;
    console.log("Inside updateAttendance");
    const totalHours = clockOut-Number(clockIn);
    if(totalHours > 9)
    {
        status = "Full Day";
    }
    else if(totalHours < 9 && totalHours > 5)
    {
        status = "Half Day";
    }
    else if(totalHours < 5 )
    {
        status = "Absent";
    }
    // Save
    await Attendance.updateOne(
        { _id: id },
        {
          $set: { exit: exit, clockOutHours:clockOut, totalHours:totalHours, status: status },
        },
        {
            $currentDate: { lastUpdated: true }
        }
    )
    .then((resp) => {
        console.log("Attendace Updated");
        res.send(resp)
    }
    )
    .catch((err)=>{
        return res.status(400).json({msg: (err)});
    })
    // res.json("Updated");
}