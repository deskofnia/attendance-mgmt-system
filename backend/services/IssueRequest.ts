import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { Req } from '../models/requestModel';

export default async function issueReq(req: Request, res: Response){
    const { user_id, book_id, status, reason } = req.body;

    // Create New Book Issue Request
    const issueRequest = new Req({ user_id, book_id, status, reason });
    // Save
    await issueRequest.save((err, bookRequest) => {
      if(err)
      {
          return res.status(400).json({msg: (err)});
      }
      return res.status(200).json({value: 1});
  })
}