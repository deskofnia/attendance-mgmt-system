import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../validators/schema';
import { ISignUp } from "../Interfaces/commonInterfaces";
import axios from "axios";
import { redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Signup.css'

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    resolver: yupResolver(SignUpschema)
  });
  
  // const navigate = useNavigate();
  
  const onSubmit = (data:ISignUp) => {
    axios.post("http://localhost:5000/api/register",data)
    .then((res) =>{
      console.log(res)
      // alert("User Added Successfully");

      toast('User Added Successfully 👽. You will be redirected to login page in 3 seconds', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // navigate('/login');
      setTimeout(() => {
        redirect("/login");
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='Signup'>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <ToastContainer />
    </form>
  );
}