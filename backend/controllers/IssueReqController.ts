import { Request, RequestHandler, Response } from 'express';
import issueReq from '../services/IssueRequest';


export  const IssueReq: RequestHandler = async (req: Request, res: Response)=> {
    issueReq(req, res);
}