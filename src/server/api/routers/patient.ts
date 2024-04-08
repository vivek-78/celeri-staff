import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const patientRouter = createTRPCRouter({
  addPatient: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        bloodGroup: z.string(),
        gender: z.string(),
        age: z.string(),
        mobile: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, gender, age, mobile, bloodGroup } =
        input;
      const patient = await ctx.db.patient.create({
        data: {
          firstName,
          lastName,
          email,
          gender,
          age,
          mobile,
          bloodGroup,
          role: "patient",
        },
      });
      return patient;
    }),
  getPatients: publicProcedure.query(async ({ ctx }) => {
    const patients = ctx.db.patient.findMany();
    return patients;
  }),
});
