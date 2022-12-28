import { Request, Response } from 'express';
import { User } from '../models/userModel';


export default async function findone(req: Request, res: Response) {
    
    const id = req.query.id;
    await User.find({_id: id})
    .then(data => {
        if (!data)
          res.status(404).send({data:{}, success:false, message: "Not found User with id " + id });
        else res.send({data:data, success:true, message:"User found with id " + id});
      })
      .catch(err => {
        res
          .status(500)
          .send({ data:{}, success:false, message: "Error retrieving User with id=" + id });
      });

}