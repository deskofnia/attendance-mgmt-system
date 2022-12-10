import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/userModel';


export default async function signup(req: Request, res: Response){
    const { email } = req.body;
    let { role } = req.body;
    role = 'user';

    const password = await bcrypt.hash(req.body.password, 10);

    // Create New User
    const user = new User({email, password, role});
    // Save
    user.save((err, user) => {
    if (err) {
      return res.status(400).json({ msg: (err) });
    }
    res.json({ user });
    })

    console.log("User Created: ", user);
}