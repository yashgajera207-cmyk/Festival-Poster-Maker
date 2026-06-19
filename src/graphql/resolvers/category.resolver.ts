import { prisma } from "@/lib/prisma";

export const categoryResolver = {
  Query: {
    categories: async () => {
      try {
        return await prisma.category.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.error(
          "CATEGORIES ERROR:",
          error
        );

        throw error;
      }
    },
  },

  Mutation: {
    createCategory: async (
      _: unknown,
      { input }: any
    ) => {
      try {
        return await prisma.category.create({
          data: {
            name: input.name,
            slug: input.slug,
          },
        });
      } catch (error) {
        console.error(
          "CREATE CATEGORY ERROR:",
          error
        );

        throw error;
      }
    },

    updateCategory: async (
      _: unknown,
      { input }: any
    ) => {
      try {
        return await prisma.category.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            slug: input.slug,
          },
        });
      } catch (error) {
        console.error(
          "UPDATE CATEGORY ERROR:",
          error
        );

        throw error;
      }
    },

    deleteCategory: async (
      _: unknown,
      { id }: any
    ) => {
      try {
        await prisma.category.delete({
          where: {
            id,
          },
        });

        return true;
      } catch (error) {
        console.error(
          "DELETE CATEGORY ERROR:",
          error
        );

        throw error;
      }
    },
  },
};