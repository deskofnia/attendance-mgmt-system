import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';

export  default async function reqlist(req: Request, res: Response){    

    await Req.find({})
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
                    book_name: "$attendance.title",
                    user_name: "$user.username",
                    status: "pending",
                }
            }
        ]);
        

        if (!data)
            res.status(404).send({ message: "Not Found !!" });
        else {
            // console.log(data);
            res.send(data);
        }
            
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "error occured" });
    });
}