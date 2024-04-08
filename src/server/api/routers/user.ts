import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ userId: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("/login");
      const user = await ctx.db.user.findUnique({
        where: { userId: input.userId },
        select: { password: true },
      });
      if (!user || user === null) {
        return new Error("invalid userID");
      }
      if (input.password != user.password) {
        return new TRPCError({
          message: "invalid password",
          code: "UNAUTHORIZED",
        });
      }
      return user;
    }),

  register: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        userId: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, userId, password } = input;
      const uniqueUserId = await ctx.db.user.findUnique({
        where: { userId },
      });
      if (uniqueUserId) {
        throw new Error("User ID already exists. Please choose a unique ID.");
      }
      const user = await ctx.db.user.create({
        data: {
          firstName,
          lastName,
          email,
          userId,
          password,
          role: "nurse",
        },
      });
      console.log(user);
      return user;
    }),
  getRole: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        userId: input,
      },
    });
    return user?.role;
  }),

  getManagers: publicProcedure.query(async ({ ctx }) => {
    const managers = await ctx.db.user.findMany({
      where: {
        role: "manager",
      },
    });
    return managers;
  }),
  getAdmins: publicProcedure.query(async ({ ctx }) => {
    const admins = await ctx.db.user.findMany({
      where: {
        role: "admin",
      },
    });
    return admins;
  }),
  getNurses: publicProcedure.query(async ({ ctx }) => {
    const nurse = await ctx.db.user.findMany({
      where: {
        role: "nurse",
      },
    });
    return nurse;
  }),
});
