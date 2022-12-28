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
        const compare = await bcrypt.compare(req.body.password, user.password)
        // make sure email and password match
        // create authenticate method in user model
        if(!compare)
        {
            return res.status(401).json({data:{}, success:false, message:{err: "Invalid Credentials"}})
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, "JWT_SECRET")

        // return response with user and send to client
        const { _id, role, email, password, status, username } = user;
        return res.json({data:token, user: {_id, role, email, password, status, username }, success:true, message:"Logged in successfully"});
    }
    else
        return res.status(400).json({ data:{}, success:false, message: {err: "User not fuond"}});

}