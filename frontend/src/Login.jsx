import { useState } from "react";
import {useStore} from "./globalVariables";
import { Link } from "react-router-dom";

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
                <p>Email:</p>
                <input type="email" placeholder="your@email.com" value={formData.GMAIL} onChange={(e)=>setFormData({ ... formData, GMAIL: e.target.value})} required/>
                <p>password:</p>
                <input type="password" value={formData.PASSWORD} onChange={(e)=> setFormData({... formData, PASSWORD: e.target.value})} required />
                <button type="submit"> login</button>
                <Link to="/signin"> sign in instead</Link>
            </form>
        </div>
    )
}
export default Login;