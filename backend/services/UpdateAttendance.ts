import { Attendance } from "../models/attendanceModel";
import { Request, Response } from 'express';

export default async function editStatus(req: Request, res: Response){
    const { exit } = req.body;
    const id = req.query.id;
    // console.log('Status', status)
    // Save
    await Attendance.updateOne(
        { _id: id },
        {
          $set: { exit: exit },
          $currentDate: { lastModified: true }
        }
    )
    .then(() => {
        console.log("Attendace Updated");
    }
    )
    .catch((err)=>{
        return res.status(400).json({msg: (err)});
    })
    // res.json("Updated");
}