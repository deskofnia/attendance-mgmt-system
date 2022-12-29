import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';


export default async function changeReq(req: Request, res: Response){
    const { status  } = req.body;
    const id = req.query.id;
    await Req.updateOne(
        { _id: id },
        {
            $set: { status: status },
        },
        {
            $currentDate: { lastUpdated: true }
        }
    )
    .then((data) => {
        // console.log("Status Updated");
        res.send({data:data, success:true, message:"Status Updated"})
    })
    .catch((err) => {
        return res.status(400).json({data:{}, success:false, message: err});
    })
}