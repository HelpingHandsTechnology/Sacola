import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return await ctx.prisma.article.findMany();
  },
});
