import { useState } from "react";
import { useStore } from "../globalVariables";
import { Link } from "react-router-dom";
import './SignInPage.css';
import backgroundImage from './assets/VisionAcademyImg.jpg'; // ✅ Import the image

const SignInPage = () => {
  const { signUp } = useStore();
  const [formData, setFormData] = useState({
    GMAIL: "",
    PASSWORD: "",
    FNAME: "",
    LNAME: "",
    USERNAME: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div
      className="signIn"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Apply background image
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
        <h1>Sign Up</h1>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={formData.GMAIL}
            onChange={(e) => setFormData({ ...formData, GMAIL: e.target.value })}
            required
          />
          <i class='bx bxs-envelope' ></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={formData.PASSWORD}
            onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
            required
          />
          <i class='bx bxs-lock-alt' ></i>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="First Name"
            value={formData.FNAME}
            onChange={(e) => setFormData({ ...formData, FNAME: e.target.value })}
            required
          />
          <i class='bx bxs-user'></i>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.LNAME}
            onChange={(e) => setFormData({ ...formData, LNAME: e.target.value })}
            required
          />
          <i class='bx bx-user' ></i>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={formData.USERNAME}
            onChange={(e) => setFormData({ ...formData, USERNAME: e.target.value })}
            required
          />
          <i class='bx bxs-user-circle' ></i>
        </div>

        <button type="submit" className="btn">Sign Up</button>
        <div className="register-link">
            <p>Do you have a account?</p>
        <Link to="/login">Login instead</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
