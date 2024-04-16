import React, { useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Edulley-logo.png";
import axios from "axios"; // Ensure you have axios installed
import { loginUser } from "../context/services/login";
import toaster from "../Shared/toaster";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    toaster.info("Logging in...");
    setLoading(true);
    console.log(email, password);
    try {
      const { data, status } = await loginUser({ adminId: email, password: password });
  
      if (status === 200) {
        console.log(data.data, "data");
        localStorage.setItem("userData", JSON.stringify(data?.data));
        navigate("/dashboard");
      } else {
        // Handle non-200 status codes gracefully
        setError(data?.message || "An error occurred"); // More specific error if available
      }
    } catch (err) {
      setError(err.response?.data.message || "An error occurred"); // More specific error if available
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col gap-[2rem] max-w-[37.5625rem] w-full p-4">
      <img className="w-[4.6875rem] mb-[1rem] mx-auto" src={logo} alt="step" />
      <h1 className="text-text text-[2rem] font-[600]">Login</h1>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col gap-[1rem]">
        <UserInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
        />
        <UserInput
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={setPassword}
        />
      </div>
      <PrimaryButton
        label={loading ? "Logging in..." : "Login"}
        action={handleLogin}
        disabled={loading}
      />
    </div>
  );
}
