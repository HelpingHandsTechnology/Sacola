import { createRouter } from "./context";
import { z } from "zod";

export const articleRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.article.findMany();
    },
  })
  .query("getFavorite", {
    async resolve({ ctx }) {
      return await ctx.prisma.article.findMany({
        where: {
          isFavorite: true,
        },
      });
    },
  });
