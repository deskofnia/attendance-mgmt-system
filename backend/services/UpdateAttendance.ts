import { Attendance } from "../models/attendanceModel";
import { Request, Response } from 'express';

export default async function updateAttendance(req: Request, res: Response){
    const { exit } = req.body;
    const id = req.body.id;
    // Save
    await Attendance.updateOne(
        { _id: id },
        {
          $set: { exit: exit },
        },
        {
            $currentDate: { lastUpdated: true }
        }
    )
    .then(() => {
        console.log("Attendace Updated");
        res.send(res)
    }
    )
    .catch((err)=>{
        return res.status(400).json({msg: (err)});
    })
    // res.json("Updated");
}