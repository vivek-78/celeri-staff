"use client";
import React from "react";
import { api } from "@/trpc/react";
import UserProfile from "../components/UserProfile";
export default function Patients() {
  const patients = api.patients.getPatients.useQuery();
  return (
    <div className="p-4">
      <h1 className="text-3xl m-4">Patients</h1>
      {patients?.data?.map((patient) => (
        <UserProfile
          key={patient.id}
          firstName={patient.firstName}
          lastName={patient.lastName}
          email={patient.email}
          role={patient.role}
          id={String(patient.id)}
        />
      ))}
    </div>
  );
}
