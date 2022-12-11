import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models/userModel';


export default async function findone(req: Request, res: Response) {
    
    const id = req.params.id;
    await User.find({_id: new ObjectId(id)})
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });

}