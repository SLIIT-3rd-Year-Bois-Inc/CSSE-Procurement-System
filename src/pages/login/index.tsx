import React, { useEffect } from "react";
import { Auth } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../../schema";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: any) => {
    try {
      await signInWithEmailAndPassword(Auth, data.email, data.password);
      // TODO - Navigate to dashboard
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (Auth.currentUser) {
      console.log(Auth.currentUser);
      return;
    }
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div>
        <h2 className="text-3xl mb-[4em] mt-[5em] font-bold">Site Manager</h2>
      </div>
      <form
        onSubmit={handleSubmit(login)}
        className="p-9  w-full md:min-w-[30em] md:w-auto md:p-8 flex flex-col items-center"
      >
        <div className="pb-6 font-medium">Login with email and password</div>
        <input
          type="text"
          {...register("email")}
          className="w-full p-3 rounded-lg"
          placeholder="Email"
        ></input>
        <div className="text-red-600 p-1 text-center">
          {errors.email?.message as string}
        </div>
        <input
          type="password"
          {...register("password")}
          className="w-full p-3 rounded-lg"
          placeholder="Password"
        ></input>
        <div className="text-red-600 p-1 text-center">
          {errors.password?.message as string}
        </div>
        <button
          type="submit"
          className="py-2 mt-6 px-8 bg-[#0097d4] text-white rounded flex-shrink"
        >
          Login
        </button>
      </form>
      <div className="flex-grow"></div>
      <div className="mb-8 font-semibold">Procurement System v1.0</div>
    </div>
  );
}
