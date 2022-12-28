import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { User } from '../models/userModel';
import { ROLES, STATUS } from '../utils/constant';


export default async function signup(req: Request, res: Response){
    const { email, username } = req.body;

    const password = await bcrypt.hash(req.body.password, 10);

    const exist = await User.findOne({ email: email})
    if(exist)
    {
      res.json({data:exist, success: true, message:"User already exist"});
    }
    else
    {
      //Ceate New User
      const user = await User.create({username, email, password, role:ROLES.USER, status:STATUS.ACTIVE});
      // Save
      user.save((err, user) => {
      if (err) {
        return res.status(400).json({ data:{}, success:false, message: err });
      }
        res.json( {data:user, success:true, message:"Sign Up Successfully"} );
      });
    }
}