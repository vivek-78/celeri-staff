import { z } from "zod";

export const patientFormValidation = z.object({
  firstName: z
    .string()
    .min(3, { message: "must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email({ message: "Must be a valid email" }),
  mobile: z.string().min(10, { message: "Must be a valid number" }),
  gender: z.string(),
  age: z.string(),
  bloodGroup: z.string(),
});

export type PatientFormValidation = z.infer<typeof patientFormValidation>;

export const loginPageValidation = z.object({
  userId: z.string().min(5, { message: "Must be 5 or more characters long" }),
  password: z.string({ required_error: "enter your password" }),
});

export type LoginPageValidation = z.infer<typeof loginPageValidation>;

export const registerFormValidation = z.object({
  firstName: z
    .string()
    .min(3, { message: "must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "must be 3 or more characters long" }),
  userId: z.string().min(5, { message: "must be 5 or more characters long" }),
  email: z.string().email(),
  mobile: z.string().min(10, { message: "Must be a valid number" }),
  password: z.string().min(8, { message: "must be 8 or more characters long" }),
});

export type RegisterFormValidation = z.infer<typeof registerFormValidation>;
