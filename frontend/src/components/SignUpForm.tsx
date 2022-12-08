import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../validators/schema';
import { ISignUp } from "../Interfaces/commonInterfaces";
import axios from "axios";


export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    resolver: yupResolver(SignUpschema)
  });
  // const onSubmit = (data:ISignUp) => console.log(data);

  const onSubmit = (data:ISignUp) => {
    axios.post("http://localhost:5000/api/register",data)
    .then((res) => console.log(res));
    // console.log(data, res);
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