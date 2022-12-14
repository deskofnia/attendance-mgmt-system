import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';


export default async function changeReq(req: Request, res: Response){
    const { status, user_id  } = req.body;
    const id = req.body.id;
    console.log('Status========', status)
    await Req.updateOne(
        { _id: id, user_id: user_id},
        {
            $set: { status: status },
        },
        {
            $currentDate: { lastUpdated: true }
        }
    )
    .then(() => {
        console.log("Status Updated");
        res.send("Status Updated")
    })
    .catch((err) => {
        return res.status(400).json({msg: (err)});
    }
    )
}