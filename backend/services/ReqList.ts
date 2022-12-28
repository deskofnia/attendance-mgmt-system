import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';

export  default async function reqlist(req: Request, res: Response){    

    await Req.find({})//
    .then((data) => {
        Req.aggregate([
            {
                $lookup: {
                   from: "users",
                   localField: "user_id",
                   foreignField: "_id",
                   as: "user"
                }
            },
            {
                $unwind: {
                    path:'$user',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "attendances",
                    localField: "attendance_id",
                    foreignField: "_id",
                    as: "attendance"
                }
            },
            {
                $unwind: {
                    path: '$attendance', 
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    user_name: "$user.username",
                }
            }
        ]);
        

        if (!data)
            res.status(404).send({data:{}, success:false, message: "Not Found !!" });
        else {
            res.send({data:data, success:true, message:"List of requests found successfully"});
        }
    })
    .catch(err => {
        res.status(500).send({data:{}, success:false, message: err.message || "error occured" });
    });
}