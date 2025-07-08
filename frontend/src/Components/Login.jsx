import { useState } from "react";
import { useStore } from "../globalVariables";
import { Link } from "react-router-dom";
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
      className="w-screen h-screen min-h-screen flex justify-center items-center bg-transparent"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ✅ Set image as background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form onSubmit={handleSubmit} className="bg-black bg-opacity-70 p-5 rounded-xl shadow-lg shadow-white w-full max-w-md">
        <h1 className="text-4xl text-center text-white">Login</h1>

        <div className="relative w-full h-12 my-7">
          <input
            type="email"
            placeholder="Email"
            value={formData.GMAIL}
            onChange={(e) => setFormData({ ...formData, GMAIL: e.target.value })}
            required
            className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-base text-white p-5 pr-11"
          />
          <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white"></i>
        </div>

        <div className="relative w-full h-12 my-7">
          <input
            type="password"
            placeholder="Password"
            value={formData.PASSWORD}
            onChange={(e) => setFormData({ ...formData, PASSWORD: e.target.value })}
            required
            className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-base text-white p-5 pr-11"
          />
          <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white"></i>
        </div>

        <button type="submit" className="w-full h-11 border-none outline-none rounded-full bg-white text-black font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300">Login</button>

        
      </form>
    </div>
  );
};

export default Login;
