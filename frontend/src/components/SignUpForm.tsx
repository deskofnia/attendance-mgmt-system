import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../validators/schema';
import { ISignUp } from "../Interfaces/commonInterfaces";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Signup.css'
import { useNavigate } from "react-router-dom";
import Nav from "./Navbar";

export default function SignUp() {

  const { register, handleSubmit, formState:{ errors } } = useForm<ISignUp>({
    resolver: yupResolver(SignUpschema)
  });

  const navigate = useNavigate();

  const onSubmit = (data:ISignUp) => {
    axios.post("http://localhost:5000/api/register", data)
    .then((res) =>{
      console.log(res)

      toast('User Added Successfully 👽. You will be redirected to login page in 3 seconds', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // navigate('/login');
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    });
  };

  return (
    <div>
        <Nav/>
        <form onSubmit={handleSubmit(onSubmit)} className='Signup'>
        <label>Username</label>
        <input {...register("username")}/>
        <p>{errors.username?.message}</p>

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
    </div>
  );
}