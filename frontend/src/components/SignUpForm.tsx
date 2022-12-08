import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../validators/schema';
import { ISignUp } from "../Interfaces/commonInterfaces";


export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    resolver: yupResolver(SignUpschema)
  });
  const onSubmit = (data:ISignUp) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
        
      <label>Password</label>
      <input {...register("password")} />
      <p>{errors.password?.message}</p>

      <label>Confirm Password</label>
      <input {...register("confirmPassword")} />
      <p>{errors.password?.message}</p>
      
      <button type="submit">Sign Up</button>
    </form>
  );
}