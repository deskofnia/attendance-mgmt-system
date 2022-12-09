import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Loginschema } from '../validators/schema';
import { ILogIn } from "../Interfaces/commonInterfaces";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Login.css';
import { redirect } from "react-router-dom";

export default function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogIn>({
    resolver: yupResolver(Loginschema)
  });

  // const navigate = useNavigate();

  const onSubmit = (data:ILogIn) => {
    axios.post("http://localhost:5000/api/login",data)
    .then((res) => {
      console.log(res);
      // alert("Logged In Successfully");
      toast('Logged In Successfully 🎉. You will be redirected to home page in 3 seconds', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    setTimeout(() => {
      redirect("/");
    }, 3000);
  };


  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
        
      <label>Password</label>
      <input type='password' {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit">LogIn</button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />
    </form>
  );
}
