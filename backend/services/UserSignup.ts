import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/userModel';


export default async function signup(req: Request, res: Response){
    const { email } = req.body;
    const { username } = req.body;

    const password = await bcrypt.hash(req.body.password, 10);

    // Create New User
    const user = await User.create({username, email, password, role:'user', status:'active'});
    // Save
    await user.save((err, user) => {
    if (err) {
      return res.status(400).json({ msg: (err) });
    }
    res.json({ user });
    })

    console.log("User Created: ", user);
}