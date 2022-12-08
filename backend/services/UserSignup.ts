import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/userModel';


export default async function signup(req: Request, res: Response){
    const password1 = req.body.password;
    const { email, role } = req.body;

    const password = await bcrypt.hash(password1, 10);

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

    // return("User not found")
}