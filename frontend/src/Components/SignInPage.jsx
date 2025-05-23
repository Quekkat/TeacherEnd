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

         <div className="login">

            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>

                <div className="input-box">
                
                <input type="email" placeholder="Email" value={formData.GMAIL} onChange={(e)=>setFormData({ ... formData, GMAIL: e.target.value})} required/>
                </div>

                <div className="input-box">

                <input type="password"  placeholder="Password" value={formData.PASSWORD} onChange={(e)=> setFormData({... formData, PASSWORD: e.target.value})} required />
                </div>

                <div className="input-box">
                
                <input type="text"  placeholder="First Name" value={formData.FNAME} onChange={(e)=>setFormData({...formData, FNAME: e.target.value})} required/>
                </div>
                 
                <div className="input-box">

                <input type="text"  placeholder="Last Name" value={formData.LNAME} onChange={(e)=>setFormData({...formData, LNAME: e.target.value})} required/>
                </div>
                 
                 <div className="input-box">
                 
                <input type="text"  placeholder="Username" value={formData.USERNAME} onChange={(e)=>setFormData({...formData, USERNAME: e.target.value})} required/>
                </div>

                <button type="submit" className="btn"> login</button>
                <Link to="/login"> login in instead</Link>
                
            </form>
        </div>
    )
}
export default SignInPage;
