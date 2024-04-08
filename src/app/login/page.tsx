"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginPageValidation, type LoginPageValidation } from "../validation";
import { api } from "@/trpc/react";
export default function Page() {
  const loginMutation = api.user.login.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageValidation>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(loginPageValidation),
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try{
      await loginMutation.mutateAsync({ ...data});
    }catch(err){
      console.log(err)
       alert(err)
    }
  });
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="mb-8 text-2xl">Login</h1>
      <form
        className="border-scale-400 flex flex-col gap-5 rounded-md border p-9"
        onSubmit={onSubmit}
      >
        <Input
          name="userId"
          label="User Id"
          placeHolder="Enter your User Id"
          register={{ ...register("userId") }}
          errorMessage={errors.userId?.message}
          sx={"w-80"}
        />
        <Input
          name="password"
          label="Password"
          placeHolder="Enter your Password"
          register={{ ...register("password") }}
          type="password"
          sx={"w-80"}
          required
        />
        <a href="/">
          <Button name="Login" sx={"w-full"} />
        </a>
        <div className="flex justify-center text-sm">
          {"Don't"} have an account?{" "}
          <a href="/register" className="mx-1 text-blue-500">
            {" "}
            Register here
          </a>
        </div>
      </form>
    </div>
  );
}
