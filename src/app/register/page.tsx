"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  type RegisterFormValidation,
  registerFormValidation,
} from "../validation";
import { api } from "@/trpc/react";
import { error } from "console";
export default function Page() {
  const registerUser = api.user.register.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValidation>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(registerFormValidation),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerUser.mutateAsync({
        ...data,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
  
    }
  });
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl">Register</h1>
      </div>
      <form
        className="border-scale-400 flex flex-col gap-5 rounded-md border p-9 drop-shadow-sm"
        onSubmit={onSubmit}
      >
        <div className="flex gap-3 sm:flex-col md:flex-row">
          <Input
            name="firstName"
            label="First Name"
            placeHolder="ex:Jhon"
            register={{ ...register("firstName") }}
            errorMessage={errors.firstName?.message}
            sx="w-full"
          />
          <Input
            name="lastName"
            label="Last Name"
            placeHolder="Wick"
            register={{ ...register("lastName") }}
            errorMessage={errors.lastName?.message}
            sx="w-full"
          />
        </div>
        <Input
          name="userId"
          label="User Id"
          placeHolder="Enter User Id"
          register={{ ...register("userId") }}
          errorMessage={errors.lastName?.message}
          sx="w-full"
        />
        <Input
          name="email"
          label="Email"
          placeHolder="Jhonwick@example.com"
          register={{ ...register("email") }}
          errorMessage={errors.email?.message}
        />
        <Input
          name="mobile"
          label="Mobile"
          placeHolder="+91 9237236421"
          register={{ ...register("mobile") }}
          errorMessage={errors.mobile?.message}
        />
        <Input
          name="password"
          label="Password"
          placeHolder="Enter your password"
          register={{ ...register("password") }}
          errorMessage={errors.lastName?.message}
          sx="w-full"
        />
        <Button name="Submit" sx={"w-full"} />
        <div className="flex justify-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="mx-1 text-blue-500">
            {" "}
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}
