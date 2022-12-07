import './css/login.css';

function LogIn() {
    return (
        <div className='login'>
          <form action="">
            <h3> Login </h3>
            <label htmlFor="mail">Email</label><br/>
            <input type="email" id="mail" required />
            <br/>
            <label htmlFor="pwd">Password</label><br/>
            <input type="password" id="pwd"/>
            <br/>
            <input type="checkbox" id="check"/>
            <label htmlFor="check">Remember me</label>
            <br/>
            <a href="./forget page.html" target="_self">Forgot Password</a>
            <br/><br/>
            <span>Don't have any account ? </span>
          </form>
        </div>
    );
}

export default LogIn;