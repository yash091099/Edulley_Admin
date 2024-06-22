import React, { useState } from "react";
import UserInput from "./UserInput";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Edulley-logo.png";
import { loginUser } from "../context/services/login";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!adminId || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const { data, status } = await loginUser({ adminId, password });
      if (status === 200) {
        localStorage.setItem("userData", JSON.stringify(data.data));
        toast.success("Logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error(data?.message || "An error occurred");
      }
    } catch (err) {
      toast.error(err.response?.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      className="flex flex-col gap-[2rem] max-w-[37.5625rem] w-full p-4"
      onKeyPress={handleKeyPress}
    >
      <img className="w-[10rem] mb-[1rem] mx-auto" src={logo} alt="logo" />
      <h1 className="text-text text-[2rem] font-[600]" style={{fontFamily:"Gilroy-Bold"}}>Login</h1>
      <div className="flex flex-col gap-[1rem]">
        <UserInput
          label="Admin ID"
          type="email"
          placeholder="Enter your admin ID"
          value={adminId}
          onChange={setAdminId}
        />
        {error && !adminId && <p className="text-sm text-red-500">Admin ID is required</p>}
        <UserInput
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={setPassword}
        />
        {error && !password && <p className="text-sm text-red-500">Password is required</p>}
      </div>
      <PrimaryButton
        label={loading ? "Logging in..." : "Login"}
        action={handleLogin}
        disabled={loading || !adminId || !password}
      />
    </div>
  );
}
