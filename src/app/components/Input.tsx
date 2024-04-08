import React from "react";
import { FormInputProps } from "@/app/types";
export default function Input({
  onInputChange,
  name,
  label,
  placeHolder,
  type,
  register,
  errorMessage,
  required,
  sx,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={`border border-slate-200 p-2 rounded-md ${sx}`}
        onChange={onInputChange}
        name={name}
        id={name}
        placeholder={placeHolder}
        type={type || "string"}
        {...register}
        required={required}
      />
      <p className="text-xs text-red-500">{errorMessage}</p>
    </div>
  );
}
