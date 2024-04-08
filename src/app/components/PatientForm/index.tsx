"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import {
  patientFormValidation,
  type PatientFormValidation,
} from "../../validation";
import Select from "../Select";
import { api } from "@/trpc/react";
export default function PatientForm() {
  const patientMutation = api.patients.addPatient.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValidation>({
    resolver: zodResolver(patientFormValidation),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { firstName, lastName, email, mobile, age, bloodGroup, gender } =
        data;
      await patientMutation.mutateAsync({
        firstName,
        lastName,
        email,
        age,
        bloodGroup,
        gender,
        mobile,
      });
      alert("registered successfully!");
    } catch {
      alert("Error occured while adding patient");
    }
  });
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center">
        <h1 className="mb-8 text-2xl">Patient Details</h1>
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
          />
          <Input
            name="lastName"
            label="Last Name"
            placeHolder="Wick"
            register={{ ...register("lastName") }}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <div className="flex flex-row gap-3">
          <Select
            name="gender"
            label="Gender"
            options={["Male", "Female"]}
            register={{ ...register("gender") }}
          />
          <Input
            name="age"
            label="Age"
            placeHolder="18"
            type="number"
            register={{ ...register("age") }}
            errorMessage={errors.age?.message}
          />
        </div>
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
        <Select
          name="bloodGroup"
          label="Blood Group"
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          register={{ ...register("bloodGroup") }}
        />
        <Button name="Add patient" type="submit" sx="w-full" />
      </form>
    </div>
  );
}
