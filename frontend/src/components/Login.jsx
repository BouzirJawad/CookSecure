import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/LoginSchema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../server/AuthContext"; // adjust path if needed


function Login() {
  const { login } = useAuth(); // get the login function to set user in context
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleLogin();
        resetForm()
      },
    });

  const handleLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:7460/users`, {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (res.data.length > 0) {
        const userData = res.data[0]
        localStorage.setItem("user", JSON.stringify(userData));
        login(userData);
        toast.success("Login successful !", { duration: 2000 });
        navigate("/")
      } else {
        toast.error("Invalid email or password", { duration: 2000 });
        navigate("/connect/login")
      }
    } catch (err) {
      toast.error("Server error. Try again later", { duration: 2000 });
      resetForm()
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-2xl font-extrabold text-[#00EEFF] mb-4">Login</h2>

        <div className="mb-4">
          <label className="text-white">email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? "input-error rounded-md bg-[#8186BC] p-2 mt-1 w-full"
                : "rounded-md bg-[#8186BC] p-2 mt-1 w-full"
            }
          />
          {errors.email && touched.email && (
            <p className="text-xs mb-1 text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-white">password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? "input-error rounded-md bg-[#8186BC] p-2 mt-1 w-full"
                : "rounded-md bg-[#8186BC] p-2 mt-1 w-full"
            }
          />
          {errors.password && touched.password && (
            <p className="text-xs mb-1 text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="text-center mt-3">
          <button
            className="bg-[#00EEFF] w-[40%] text-md font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
        
      <p className="mt-4 text-sm text-center text-white">
        New user?
        
          <Link to={"/connect/register"} className="text-[#00EEFF] underline ml-10">
            Register here
          </Link>
        
      </p>
    </>
  );
}

export default Login;
