import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  changeRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: {
            userId: input.userId,
          },
          data: {
            role: input.role,
          },
        });
      } catch {
        return new TRPCError({
          message: "unable to change the role",
          code: "BAD_REQUEST",
        });
      }
    }),
});
