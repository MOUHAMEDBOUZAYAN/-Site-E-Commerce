import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("profile")) || {}
  );

  useEffect(() => {
    sessionStorage.setItem("profile", JSON.stringify(data));
  }, [data]);

  const onSubmit = async (values, actions) => {
    await handleRegister(values ,()=>{actions.resetForm();});

  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      isAdmin: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const handleRegister = async (values) => {
    try {
      const res = await axios.post("http://localhost:9000/api/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        isAdmin: values.isAdmin,
      });

      setData(res.data)

      setMessage("Registering ...");
      setTimeout(() => {
        console.log(res.data.isAdmin);
        if (res.data.isAdmin) {
          navigate("/AdminPage");
          console.log("this is admin page");
        } else {
          navigate("/Store");
          console.log("this is store page");
        }
        setMessage("");
      }, 2000);

    } catch (err) {
        if (err.response && err.response.status === 404) {
            setMessage("Email is already in use. Please try a different one.");
        } else {
            setMessage("Registration failed! Please try again.");
        }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-2xl text-blue-500 mb-4">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.username && touched.username
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.username && touched.username && (
          <p className="text-xs mb-1 text-red-500">{errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.email && touched.email
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.email && touched.email && (
          <p className="text-xs mb-1 text-red-500">{errors.email}</p>
        )}

        <select
          name="isAdmin"
          placeholder="select your role"
          value={values.isAdmin}
          onChange={(e) => handleChange({ 
            target: { name: "isAdmin", value: e.target.value === "true" } 
          })}
          className={
            errors.email && touched.email
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        >
          <option value="false">User</option>
          <option value="true">Admin</option>
        </select>
        {errors.isAdmin && touched.isAdmin && (
          <p className="text-xs mb-1 text-red-500">{errors.isAdmin}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.password && touched.password
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.password && touched.password && (
          <p className="text-xs mb-1 text-red-500">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "input-error border-2 rounded-2xl p-2 mb-1 w-full"
              : "border-2 rounded-2xl p-2 mb-1 w-full"
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-xs mb-1 text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          disabled={isSubmitting}
          className="primary-btn w-full disabled:opacity-30"
          type="submit"
        >
          Register
        </button>

        <p className="text-blue-500 mt-2 text-center">{message}</p>
      </form>
    </>
  );
}

export default RegisterPage;
