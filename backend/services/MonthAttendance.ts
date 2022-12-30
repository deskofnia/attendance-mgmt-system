import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function monthattendance(req: Request, res: Response) {
    const { user_id, fromdate, todate } = req.body;

    console.log("Dates... ", fromdate, "=====", todate);
    
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
            res.status(404).send({data:{}, success:false, message: "Not Found !!" });
        else {
            // console.log(data.length);
            res.send({data:data, success:true, message:"Success!"});
        }
            
    })
    .catch(err => {
        res.status(500).send({data:{}, success:false, message: err.message || "error occured"});
    })
}

