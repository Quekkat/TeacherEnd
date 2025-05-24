import { useState } from "react";
import { useStore } from "../globalVariables";
import { Link } from "react-router-dom";
import './Login.css';
import backgroundImage from './assets/VisionAcademyImg.jpg'; // ✅ Import image

const Login = () => {
  const { login } = useStore();
  const [formData, setFormData] = useState({
    GMAIL: "",
    PASSWORD: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Set image as background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={formData.GMAIL}
            onChange={(e) => setFormData({ ...formData, GMAIL: e.target.value })}
            required
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={formData.PASSWORD}
            onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <button type="submit" className="btn">Login</button>

        <div className="register-link">
          <p>Don't have an account?</p>
          <Link className="signUp" to="/signin">Sign Up Instead</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
