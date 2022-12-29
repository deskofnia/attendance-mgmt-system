import { Attendance } from "../models/attendanceModel";
import { Request, Response } from 'express';

export default async function updateReqAttendance(req: Request, res: Response){
    const { id, status, totalHrs} = req.body;
    // Save
    await Attendance.updateOne(
        { _id: id },
        {
          $set: { totalHours:totalHrs, status: status },
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