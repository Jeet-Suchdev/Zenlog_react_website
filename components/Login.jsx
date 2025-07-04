import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../src/store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../src/appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-full bg-[#222831] text-[#EEEEEE] font-sans px-4">
      <div className="mx-auto w-full max-w-md bg-[#31363F] rounded-2xl shadow-md p-8 md:p-10 flex flex-col gap-6 border border-[#76ABAE] mt-32">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl md:text-3xl font-bold leading-tight text-[#76ABAE] mb-2">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-[#EEEEEE]/70 mb-4">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-bold text-[#76ABAE] transition-all duration-300 ease-in-out hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-500 mt-4 text-center text-sm font-normal">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-5 mt-4"
        >
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full mt-2">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
