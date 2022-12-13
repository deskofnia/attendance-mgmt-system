import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Loginschema } from '../validators/schema';
import { ILogIn } from "../Interfaces/commonInterfaces";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Nav from "./Navbar";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './css/Login.css';

export default function LogIn() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<ILogIn>({
    resolver: yupResolver(Loginschema)
  });

  // console.log(errors,"======errors=====");
  

  const navigate = useNavigate();


  const onSubmit = (data:ILogIn) => {
    
    axios.post("http://localhost:5000/api/login", data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("id", res.data.user._id);
      if(res.data.user.role ==="user")
      {
          if(res.data.user.status === "active") {
            toast('Logged In Successfully 🎉. You will be redirected to user page in 3 seconds', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
              
            setTimeout(() => {
              navigate("/user");
            }, 2000);
          }
        else{
          toast('Sorry Can not login !! User is Inactived by the Admin', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      else
      {
        toast('Logged In Successfully 🎉. You will be redirected to admin page in 3 seconds', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
          
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    
    })
    .catch((err) => {
      if(err.status === 401){
        toast('Invalid Credentials !!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else
      {
        toast('User not found !!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
  };


  return (
    <div>
      <Nav/>
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
    </div>
  );
}