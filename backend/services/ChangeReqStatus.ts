import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';


export default async function changeReq(req: Request, res: Response){
    const { stat  } = req.body;
    const id = req.query.id;
    await Req.updateOne(
        { _id: id },
        {
            $set: { status: stat },
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