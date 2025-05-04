import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/RegisterSchema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        isAdmin: false,
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleRegister();
        resetForm()
      },
    });

  const handleRegister = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7460/users`, {
          params: {
            email: values.email
          }
        }
      );

      if (res.data.length > 0) {
        toast.error("User already exists !", { duration: 2000 });
      } else {
        await axios.post("http://localhost:7460/users", {
          username: values.username,
          email: values.email,
          password: values.password,
          isAdmin: values.isAdmin,
        });
        
        toast.success("Registering successful!", { duration: 3000 });
        navigate("/connect/login")
      }
    } catch (err) {
      toast.error("Something went wrong !", {duration: 4000});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-2xl font-extrabold text-[#00EEFF] mb-4">
          Register
        </h2>

        <div className="mb-4">
          <label className="text-white">username</label>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.username && touched.username
                ? "input-error rounded-md bg-[#8186BC] p-2 mt-1 w-full"
                : "rounded-md bg-[#8186BC] p-2 mt-1 w-full"
            }
          />
          {errors.username && touched.username && (
            <p className="text-xs mb-1 text-red-500">{errors.username}</p>
          )}
        </div>

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
          <label className="text-white">Role</label>
          <select
            name="isAdmin"
            value={values.isAdmin === true ? "true" : "false"}
            onBlur={handleBlur}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "isAdmin",
                  value: e.target.value === "true",
                },
              })
            }
            className={
              errors.isAdmin && touched.isAdmin
                ? "input-error rounded-md bg-[#8186BC] text-[#2c2e45] p-2 mt-1 w-full text"
                : "rounded-md bg-[#8186BC] text-[#2c2e45] p-2 mt-1 w-full"
            }
          >
            <option value="false">Member</option>
            <option value="true">Admin</option>
          </select>
          {errors.isAdmin && touched.isAdmin && (
            <p className="text-xs mb-1 text-red-500">{errors.isAdmin}</p>
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

        <div className="mb-4">
          <label className="text-white">password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error rounded-md bg-[#8186BC] p-2 mt-1 w-full"
                : "rounded-md bg-[#8186BC] p-2 mt-1 w-full"
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-xs mb-1 text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            className="bg-[#00EEFF] w-[40%] mt-7 text-md font-bold"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-white">
        Already have an account?
        <Link to={"/connect/login"} className="text-[#00EEFF] underline ml-10">
          Login here
        </Link>
      </p>
    </>
  );
}

export default Register;
