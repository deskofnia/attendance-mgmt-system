import { Request, RequestHandler, Response } from 'express';
import { Req } from '../models/requestModel';


export default async function changeReq(req: Request, res: Response){
    const { status } = req.body;
    const id = req.query.id;
    console.log('Status', status)
    try{
        await Req.updateOne(
            { _id: id },
            {
              $set: { status: status },
              $currentDate: { lastModified: true }
            }
        )
        .then(res => {"Updated Successfully"})
    }
    catch(err){
        return res.status(400).json({msg: (err)});
    }

}