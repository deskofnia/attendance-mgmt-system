import { Request, Response } from 'express';
import { Req } from '../models/requestModel';

export default async function issueReq(req: Request, res: Response){
    const { user_id, attendance_id } = req.body;
    // Create New Book Issue Request
    const issueRequest = new Req({ user_id, attendance_id, status:'pending' });
    
    await issueRequest.save((err) => {
      if(err)
      {
          return res.status(400).json({msg: (err)});
      }
      return res.status(200).json("Request has been issued successfully");
    })
}