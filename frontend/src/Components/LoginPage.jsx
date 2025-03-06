import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const path = isRegistering
        ? "http://localhost:9000/api/users/register"
        : "http://localhost:9000/api/users/login";
      const profile = isRegistering
        ? { username, email, password }
        : { email, password };

        if(password !== confirmPassword){
            setMessage("password is not matching")
            return
        }

      const res = await axios.post(path, profile);

      if (res.email) {
        setMessage("user already exist")
        return
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Logged In ...");
        setTimeout(() => {
          navigate("/Csoon");
        }, 2000);
      } else {
        setMessage(
          res.data.message || "Login failed! Check your email and password."
        );
      }
    } catch (error) {
      setMessage("Login failed!");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-6 rounded-lg shadow-md w-[80%] md:w-[50%]">
          <h2 className="text-2xl text-amber-500 mb-4">
            {isRegistering ? "Resiter" : "Login"}
          </h2>
          {isRegistering && (
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            className="border p-2 mb-2 w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering &&
          <input
            className="border p-2 mb-2 w-full"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            }
          <button className="primary-btn w-full" onClick={handleLogin}>
            {isRegistering ? "Register" : "Login"}
          </button>
          <p className="text-amber-500 mt-2 text-center">{message}</p>
          <p className="mt-4 text-sm text-center">
            {isRegistering ? "Already have an account?" : "New user?"}{" "}
            <button
              className="text-blue-500 underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
