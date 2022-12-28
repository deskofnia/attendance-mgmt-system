import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function attendancelist(req: Request, res: Response) {
    await Attendance.find({user_id: req.body.user_id})
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
            res.status(404).send({ data:{}, success:false, message: "Not Found !!" });
        else {
            // console.log(data);
            res.send({data:data, success:true, message:"Attendance list found successfully"});
        }
            
    })
    .catch(err => {
        res.status(500).send({ data:{}, success:false, message: err.message || "error occured" });
    })
}

