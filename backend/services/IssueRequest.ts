import { Request, Response } from 'express';
import { Req } from '../models/requestModel';
import { REQSTATUS } from '../utils/constant';

export default async function issueReq(req: Request, res: Response){
    const { user_id, attendance_id } = req.body;
    // Create New Book Issue Request

    const checkRequest = await Req.findOne({attendance_id: attendance_id});
    console.log("Data============",checkRequest);

    if(checkRequest)
    {
      res.json({data:checkRequest, success: true, message:"Request already exist"});
    }
    else
    {
      const issueRequest = new Req({ user_id, attendance_id, status:REQSTATUS.PENDING });
    
      issueRequest.save((err, data) => {
        if(err)
        {
          return res.status(400).json({data:{}, success:false, message:err});
        }
        return res.status(200).json({data:data, success:true, message:"Request issued successfully"});
      })
    }
}