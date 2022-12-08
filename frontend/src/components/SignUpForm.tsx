import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../validators/schema';
import { ISignUp } from "../Interfaces/commonInterfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    resolver: yupResolver(SignUpschema)
  });
  
  const navigate = useNavigate();
  
  const onSubmit = (data:ISignUp) => {
    axios.post("http://localhost:5000/api/register",data)
    .then((res) =>{
      console.log(res)
      alert("User Added Successfully");

      navigate('/login');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
        
      <label>Password</label>
      <input type='password' {...register("password")} />
      <p>{errors.password?.message}</p>

      <label>Confirm Password</label>
      <input type='password' {...register("confirmPassword")} />
      <p>{errors.password?.message}</p>
      
      <button type="submit">Sign Up</button>
    </form>
  );
}