import { useState } from "react";
import { useStore } from "../globalVariables";
import { Link } from "react-router-dom";
import './SignInPage.css';




const SignInPage = ()=>{
    const {signUp} = useStore();
    const [formData, setFormData] = useState({GMAIL:"", PASSWORD: "", FNAME:"",LNAME: "", USERNAME:"" });
    const handleSubmit = async (e) => {
    e.preventDefault();
    signUp(formData);
  };
    return(
         <div className="login-signup-body">
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input type="email" placeholder="your@email.com" value={formData.GMAIL} onChange={(e)=>setFormData({ ... formData, GMAIL: e.target.value})} required/>
                <p>password:</p>
                <input type="password" value={formData.PASSWORD} onChange={(e)=> setFormData({... formData, PASSWORD: e.target.value})} required />
                <p>First Name</p>
                <input type="text" value={formData.FNAME} onChange={(e)=>setFormData({...formData, FNAME: e.target.value})} required/>
                 <p>Last Name</p>
                <input type="text" value={formData.LNAME} onChange={(e)=>setFormData({...formData, LNAME: e.target.value})} required/>
                 <p>Username</p>
                <input type="text" value={formData.USERNAME} onChange={(e)=>setFormData({...formData, USERNAME: e.target.value})} required/>
                <button type="submit"> login</button>
                <Link to="/login"> login in instead</Link>
            </form>
        </div>
    )
}
export default SignInPage;
