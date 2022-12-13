import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';

export default async function attendancelist(req: Request, res: Response) {
    await Attendance.find({user_id: req.body.user_id})
    .then((data) => {

        Attendance.aggregate([
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
                    path:'$attendace',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        if (!data)
            res.status(404).send({ message: "Not Found !!" });
        else {
            console.log(data);
            res.send(data);
        }
            
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "error occured" });
    })
}

