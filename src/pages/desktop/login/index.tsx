import React, { useEffect } from "react";
import { Auth } from "../../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../../../schema";
import { useNavigate } from "react-router-dom";

export default function ProcurementLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const login = async (data: any) => {
    try {
      await signInWithEmailAndPassword(Auth, data.email, data.password);
      navigate("/procurement/order");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(Auth.currentUser);
    if (Auth.currentUser) {
      console.log(Auth.currentUser);
      return;
    }
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[30em] border-2 rounded-lg border-[#0097d4]">
        <div className="pt-8">
          <h2 className="text-3xl text-center font-bold">Procurement</h2>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="p-8 flex flex-col items-center"
        >
          <div className="pb-6 font-medium">Login with email and password</div>
          <input
            type="text"
            {...register("email")}
            className="w-full p-3 rounded-lg"
            placeholder="Email"
          ></input>
          <div className="text-red-600 p-1">
            {errors.email?.message as string}
          </div>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 rounded-lg"
            placeholder="Password"
          ></input>
          <div className="text-red-600 p-1">
            {errors.password?.message as string}
          </div>
          <button
            type="submit"
            className="py-2 mt-6 px-8 bg-[#0097d4] text-white rounded flex-shrink"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
