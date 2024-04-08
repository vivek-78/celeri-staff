import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@/server/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    role: null,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
const isAuthenticated = t.middleware(({ ctx, next }) => {
  const authtoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJ2aXZlazE0IiwiaWF0IjoxNTE2MjM5MDIyfQ.kcy-Yksg1XqR2M6tRWv0-_Q8fDsrTLMV6VKcvSCio8k";
  return next({ ctx });
});
export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure;
export const managerProcedure = t.procedure;
