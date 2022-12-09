import { Request, Response } from 'express';
import { User } from '../models/userModel';


export default async function getUser(req: Request, res: Response) {
    
    const user = await User.findById(req.params.id);

    // If user is found
    console.log(user);
    if(user)
        return res.json(user);
    else
        return res.status(400).json({err: "User not fuond"});

}