import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function monthattendance(req: Request, res: Response) {
    const { user_id, fromdate, todate } = req.body
    
    await Attendance.find({user_id: user_id, date: { $gte:fromdate, $lte:todate}})
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
            res.status(404).send({ message: "Not Found !!" });
        else {
            console.log(data.length);
            res.send(data);
        }
            
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "error occured" });
    })
}

