import React, { useState, useRef } from "react";
import authService from "../src/appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../src/store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userDataObj = await authService.getCurrentUser();
        if (userDataObj) dispatch(login({ userData: userDataObj }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-[#222831] text-[#EEEEEE] font-sans px-4">
      <div className="mx-auto w-full max-w-md bg-[#31363F] rounded-2xl shadow-md p-8 md:p-10 flex flex-col gap-6 border border-[#76ABAE] mt-24">
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl md:text-3xl font-bold leading-tight text-[#76ABAE] mb-2">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-[#EEEEEE]/70 mb-4">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-bold text-[#76ABAE] transition-all duration-300 ease-in-out hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && (
          <p className="text-red-500 mt-4 text-center text-sm font-normal">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(create)} className="flex flex-col gap-5">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
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
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
