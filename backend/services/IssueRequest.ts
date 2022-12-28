import { Request, Response } from 'express';
import { Req } from '../models/requestModel';
import { REQSTATUS } from '../utils/constant';

export default async function issueReq(req: Request, res: Response){
    const { user_id, attendance_id } = req.body;
    // Create New Book Issue Request
    const issueRequest = new Req({ user_id, attendance_id, status:REQSTATUS.PENDING });
    
    await issueRequest.save((err) => {
      if(err)
      {
        return res.status(400).json({data:{}, success:false, message:err});
      }
      return res.status(200).json({data:{}, success:true, message:"Request saved successfully"});
    })
}