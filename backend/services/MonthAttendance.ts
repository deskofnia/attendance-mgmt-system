import { Request, Response } from 'express';
import { Attendance } from '../models/attendanceModel';
import dayjs from 'dayjs';

export default async function monthattendance(req: Request, res: Response) {
    const { user_id, fromdate, todate } = req.body;

    const formatedFromDate = dayjs(fromdate).format('MM/DD/YYYY');
    const formatedToDate = dayjs(todate).format('MM/DD/YYYY');
    
    await Attendance.find({user_id: user_id, date: { $gte:formatedFromDate, $lte:formatedToDate}})
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

