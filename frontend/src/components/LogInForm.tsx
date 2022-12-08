import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Loginschema } from '../validators/schema';
import { ILogIn } from "../Interfaces/commonInterfaces";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogIn>({
    resolver: yupResolver(Loginschema)
  });

  const navigate = useNavigate();

  const onSubmit = (data:ILogIn) => {
    axios.post("http://localhost:5000/api/login",data)
    .then((res) => {
      console.log(res);
      alert("Logged In Successfully");

      navigate('/');
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

      <button type="submit">LogIn</button>
    </form>
  );
}