import React, {useState} from 'react';
import './css/signup.css';


interface SignUpState {
  email : string,
  password : string,
  checked: boolean
}

function SignUp() {

  const initialValues:SignUpState = {email : "", password : "", checked: false};
  const [formValues, setFormValues] = useState<SignUpState>(initialValues);
  const [formErrors, setFormErrors] = useState<SignUpState>(initialValues);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;      //destructuring
    setFormValues({...formValues, [name]: value});
    // console.log(formValues);
  };

  const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.target.name]: e.target.checked});
    // console.log(formValues);
  };

  const handleSubmit = () => {
    if(validate()){
      setFormErrors(initialValues);
      console.log("User Added Successfully");
    }
    else
    {
      console.log("Please fill the fields correctly");
    }
  }

  const validate = () => {
    let valid=true;

    const errors=formErrors;
    const EmailRegex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

    if(formValues.email.trim().length === 0){
      errors.email = "Email is required!";
      valid=false;
    } else if(!EmailRegex.test(formValues.email)){
      errors.email = "This is not a valid email format!";
    }
    if(formValues.password.trim().length === 0){
      errors.password = "Password is required!";
      valid=false;
    }else if(formValues.password.length < 4 ){
      errors.password = "Password must be more than 4 characters";
    }
    else if(formValues.password.length > 10 ){
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if(formValues.checked === false)
    {
      valid=false;
    }
    setFormErrors(errors);
    return valid;
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className='neww'>
          <h1>Sign Up</h1>
          <label htmlFor="mail">Email</label><br/>
          <input type="email" id="mail" name="email" onChange={(event) => handleChange(event)}/>
          <br/>
          <p className="para">{formErrors.email}</p>
          <label htmlFor="pwd">Password</label><br/>
          <input type="password" id="pwd" name="password"onChange={(event) => handleChange(event)}/>
          <br/>
          <p className="para">{formErrors.password}</p>
          <label>Select Gender</label><br/>
          <input type="radio" value="Male" name="gender" onChange={(event) => handleCheck(event)}/> Male
          <br />
          <input type="radio" value="Female" name="gender" onChange={(event) => handleCheck(event)}/> Female
          <br/><br />
          <input type="checkbox" id="check" name="checked" onChange={(event) => handleCheck(event)}/>
          <label htmlFor="check">Remember me</label>
          <br/>
          <button id="btn">Sign Up</button><br/><br/>
        </form>
    </div>
  );
}

export default SignUp;