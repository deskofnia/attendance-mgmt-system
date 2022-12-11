import { Request, Response } from 'express';
import { User } from '../models/userModel';

export default async function list(req: Request, res: Response) {
    await User.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error occured" })
        })
}