import { Request, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';


export default async function login(req: Request, res: Response) {
    
    const user = await User.findOne({email: req.body.email});

    // If user is found
    console.log(user);
    if(user)
    {
        const role1 = req.body.role;
        const compare = await bcrypt.compare(req.body.password, user.password)
        // make sure email and password match
        // create authenticate method in user model
        if(!compare)
        {
            return res.status(401).json({err: "Invalid Credentials"})
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, "JWT_SECRET")

        // return response with user and send to client
        const { _id, role, email, password } = user;
        return res.json({token, user: {_id, role, email, password }, check:role1==='user'?'user': 'admin'});
    }
    else
        return res.status(400).json({err: "User not fuond"});

}