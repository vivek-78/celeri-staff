import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { patientRouter } from "./routers/patient";

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  admin: adminRouter,
  patients: patientRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
