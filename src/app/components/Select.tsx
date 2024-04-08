import React from "react";
import { FormInputProps } from "@/app/types";
export default function Select({
  name,
  label,
  onInputChange,
  options,
  register,
  sx,
}: FormInputProps) {
  return (
    <div className={`flex w-full flex-col gap-1 ${sx}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={name}
        className="rounded-md border border-slate-200 p-2 w-full"
        onChange={onInputChange}
        {...register}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
