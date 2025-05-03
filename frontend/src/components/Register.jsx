import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/RegisterSchema";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

function Register() {
  //   const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("User")) || {}
  );

  useEffect(() => {
    sessionStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  const onSubmit = async (values, actions) => {
    await handleRegister(values, () => {
      actions.resetForm();
    });
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
    onSubmit: async (values, { resetForm }) => {
      await handleRegister();
      resetForm();
    },
  });

  const handleRegister = async (values) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${values.email}`
      );
      if (res.data.length > 0) {
        toast.error("User already exists !", { duration: 3000 });
        return;
      }

      await axios.post("http://localhost:7460/users", {
        username: values.username,
        email: values.email,
        password: values.password,
        isCoach: values.isCoach,
      });

      toast.success("Registering ...", { duration: 3000 });
      resetForm();
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-2xl font-extrabold text-[#00EEFF] mb-4">
          Register
        </h2>

        <div className="mb-4">
          <label htmlFor="username" className="text-white">
            username
          </label>
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
          <label htmlFor="email" className="text-white">
            email
          </label>
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
          <label htmlFor="isCoach" className="text-white">
            Role
          </label>
          <select
            name="isCoach"
            placeholder="select your role"
            value={values.isCoach}
            onChange={(e) =>
              handleChange({
                target: { name: "isCoach", value: e.target.value === "true" },
              })
            }
            className={
              errors.isCoach && touched.isCoach
                ? "input-error rounded-md bg-[#8186BC] p-2 mt-1 w-full"
                : "rounded-md bg-[#8186BC] p-2 mt-1 w-full"
            }
          >
            <option value="false">Member</option>
            <option value="true">Coach</option>
          </select>
          {errors.isCoach && touched.isCoach && (
            <p className="text-xs mb-1 text-red-500">{errors.isCoach}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-white">
            password
          </label>
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
          <label htmlFor="password" className="text-white">
            password
          </label>
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

        <div className="text-center mt-3">
          <button
            className="bg-[#00EEFF] w-[40%] text-md font-bold"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
