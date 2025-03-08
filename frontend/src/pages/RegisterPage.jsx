import React, { useState } from "react";
import axios from "axios";
import { useFormik } from 'formik'
import { registerSchema } from '../schemas/registerSchema'
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const [message, setMessage] = useState("");

  const onSubmit = async (values) => {
    await handleRegister();
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  })


  const handleRegister = async () => {
    try {
    
      const res = await axios.post("http://localhost:9000/api/users/register", { username: values.username, email: values.email, password: values.password });

      if (res.email) {
        setMessage("user already exist")
        return
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Logged In ...");
        // setTimeout(() => {
        //   navigate("/Csoon");
        // }, 2000);
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
          <form onSubmit={handleSubmit} autoComplete="off">

            <h2 className="text-2xl text-blue-500 mb-4">
              Register
            </h2>
            
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username ? "input-error border-2 rounded-2xl p-2 mb-2 w-full" : "border-2 rounded-2xl p-2 mb-2 w-full"}
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error border-2 rounded-2xl p-2 mb-2 w-full" : "border-2 rounded-2xl p-2 mb-2 w-full"}
              />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error border-2 rounded-2xl p-2 mb-2 w-full" : "border-2 rounded-2xl p-2 mb-2 w-full"}
              />

            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword && touched.confirmPassword ? "input-error border-2 rounded-2xl p-2 mb-2 w-full" : "border-2 rounded-2xl p-2 mb-2 w-full"}
            />

            <button className="primary-btn w-full" type="submit">
              Register
            </button>

            <p className="text-amber-500 mt-2 text-center">{message}</p>

          </form>
    </>
  );
}

export default RegisterPage;
