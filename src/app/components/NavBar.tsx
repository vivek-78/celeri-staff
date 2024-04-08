"use client";
import React from "react";
import Button from "./Button";
import Link from "next/link";
export default function Navigation() {
  return (
    <div className="border-b-1 mb-5 flex w-full flex-row items-center justify-between gap-2 border p-2 shadow-sm">
      <h1 className="ml-2 text-xl">Celeri Health</h1>
      <div>
        <ul className="flex flex-row items-center justify-center gap-5">
          <li className="hover:cursor-pointer">
            <Link href={"/"}>Staff</Link>
          </li>
          <li>
            <Link href={"/add-patient"} className="hover:cursor-pointer">
              Add Patient
            </Link>
          </li>
          <li>
            <Link href={"/patients"} className="hover:cursor-pointer">
              Patients
            </Link>
          </li>
          <li>
            <a href="/login">
              <Button name="Log out" sx="p-2 w-28 mb-1" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
