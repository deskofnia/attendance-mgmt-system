import { Request, Response } from 'express';
import { User } from '../models/userModel';

export default async function list(req: Request, res: Response) {
    console.log("Query===>",req.query._id);
    await User.find()
    .then(user => {
        res.send({data:user, success:true, message:"User Found"});
    })
    .catch(err => {
        res.status(500).send({ data:{}, success:false, message: err.message || "error occured" })
    })
}
