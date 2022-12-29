import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';

export  default async function reqlistbyid(req: Request, res: Response){    
    console.log("Im in..........");
    await Req.find({user_id: req.body.user_id})//
    .then((data) =>
    {
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
            res.status(404).send({ data:{}, success:false, message: "Request Not Found !!" });
        else {
            // console.log(data);
            res.send({data:data, success:true, message:"Request Found"});
        }
    })
    .catch(err => {
        res.status(500).send({ data:{}, success:false, message: err.message || "error occured" });
    });
}