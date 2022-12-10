import { Request, Response } from 'express';
import { User } from '../models/userModel';


export default async function list(req: Request, res: Response) {
    
    const user: { password: string; _id: string; role?: string; email?: string; }[] = await User.find();

    // If user is found
    console.log(user);
    if(user.length !== 0)
    {
        return res.json(user);
    }
    else
        return res.status(400).json({err: "Users not fuond"});

}