import { Routes, Route } from "react-router-dom";
import LogIn from "../components/LogInForm";
import SignUp from "../components/SignUpForm";

function Myroutes() {
    return (
      <div>
        <Routes>
        <Route path='/' element={ <h1>Home</h1> } />
        <Route path='signup' element={<SignUp/>}/>
        <Route path='login' element={<LogIn/>}/>
        {/* <Route path='products' element={<Products />} >
          <Route index element={<FeaturedProducts/>} />
          <Route path='featuredproducts' element={ <FeaturedProducts /> } />
          <Route path='newproducts' element={ <NewProducts /> } />
        </Route> */}
      </Routes>
      </div>
    );
  };
  
  export default Myroutes;