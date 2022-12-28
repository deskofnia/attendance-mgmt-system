import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function dayattendance(req: Request, res: Response) {
    const { user_id, date } = req.body
    
    await Attendance.find({user_id: user_id, date: date})
    .then(async (data) => {
        await Attendance.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField: "_id",
                    as: "attendance"
                }
            },
            {
                $unwind:{
                    path:'$attendance',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        if (!data)
            res.status(404).send({data:{}, success:false, message: "Not Found !!" });
        else {
            // console.log(data.length);
            res.send({data:data, success:true, message:"Attendance Found"});
        }
    })
    .catch(err => {
        res.status(500).send({data:{}, success:false, message: err.message || "error occured" });
    })
}

