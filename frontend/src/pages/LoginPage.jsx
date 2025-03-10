import React, { useState } from "react";
import axios from "axios";
import { useFormik } from 'formik'
import { loginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [message, setMessage] = useState("");

  const onSubmit = async (values, action) => {
    await handleLogin(values, ()=>{action.resetForm();});
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  })


  const handleLogin = async () => {
    try {
      
      const res = await axios.post("http://localhost:9000/api/users/login", { email: values.email, password: values.password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Logged In ...");
        
        setTimeout(() => {
          console.log(res.data.user.isAdmin);
          if (res.data.user.isAdmin) {
            // navigate("/Admin");
            console.log("this is admin page");
          } else {
            // navigate("/Store");
            console.log("this is store page");
          }
          setMessage("");
        }, 2000);

      } else {
        setMessage(
          res.data.message || "Login failed! Check your email and password."
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage("Incorrect password!");
      } else {
        setMessage("Registration failed! Please try again.");
    }
    }
  };

  return (
    <>
          <form onSubmit={handleSubmit} autoComplete="off">

            <h2 className="text-2xl text-amber-500 mb-4">
              Login
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error border-2 rounded-2xl p-2 mb-1 w-full" : "border-2 rounded-2xl p-2 mb-1 w-full"}
              />
              {errors.email && touched.email && (
                <p className="text-xs mb-1 text-red-500">{errors.email}</p>
              )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error border-2 rounded-2xl p-2 mb-1 w-full" : "border-2 rounded-2xl p-2 mb-1 w-full"}
              />
              {errors.password && touched.password && (
                <p className="text-xs mb-1 text-red-500">{errors.password}</p>
              )}

            <button className="sec-btn w-full" type="submit">
              Login
            </button>

            <p className="text-amber-500 mt-2 text-center">{message}</p>

          </form>
    </>
  );
}

export default LoginPage;
