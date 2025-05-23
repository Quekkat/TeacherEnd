import { useState } from "react";
import {useStore} from "../globalVariables";
import { Link } from "react-router-dom";
import './Login.css';

const Login =()=>{
    const {login} = useStore();
    const [formData, setFormData]= useState({
        GMAIL:"",
        PASSWORD: "",
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
    return(
        <div className="login-signup-body">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                
                <input type="email" placeholder="Your@email.com" value={formData.GMAIL} onChange={(e)=>setFormData({ ... formData, GMAIL: e.target.value})} required/>
                <i class='bx bxs-user' ></i>
                </div>

                <div className="input-box">
               
                <input type="password" placeholder="Password" value={formData.PASSWORD} onChange={(e)=> setFormData({... formData, PASSWORD: e.target.value})} required />
                <i class='bx bxs-lock-alt' ></i>
                </div>

                <button type="submit" class="btn"> login</button>

                <div className="register-link">
                    <p>Don't have an account?</p>
                    <Link className="signUp" to="/signin"> Sign In Instead</Link>
                </div>
                
            </form>
        </div>
    )
}
export default Login;