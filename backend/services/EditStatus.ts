import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/userModel';


export default async function editStatus(req: Request, res: Response){
    const { status } = req.body;
    const id = req.query.id;
    console.log('Status', status)
    let request;
    // Save
    try{
        await User.updateOne(
            { _id: id },
            {
              $set: { status: status },
              $currentDate: { lastModified: true }
            }
         )
         request = await User.findOne({_id:id})
         console.log("Edit Status User: ",request);
        res.json(request);
    }
    catch(err){
        return res.status(400).json({msg: (err)});
    }
    // res.json("Updated");
}