import { Attendance } from "../models/attendanceModel";
import { Request, Response } from 'express';

export default async function updateAttendance(req: Request, res: Response){
    const { exit, clockOut, clockIn, id } = req.body;
    let status;
    console.log("Inside updateAttendance");
    const totalHours = clockOut-Number(clockIn);
    console.log("totalHours: " + totalHours);
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
    .then((data) => {
        // console.log("Attendace Updated");
        res.send({data: data, success: true, message: "Attendance Updated"});
    }
    )
    .catch((err)=>{
        return res.status(400).json({data:{}, success:false, message: err});
    })
    // res.json("Updated");
}