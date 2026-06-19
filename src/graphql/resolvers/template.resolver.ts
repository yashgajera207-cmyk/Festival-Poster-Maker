import { prisma } from "@/lib/prisma";

export const templateResolver = {
  Query: {
    templates: async () => {
      try {
        return await prisma.template.findMany({
          include: {
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.error(
          "TEMPLATES ERROR:",
          error
        );

        throw error;
      }
    },

    template: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      try {
        return await prisma.template.findUnique({
          where: {
            id,
          },
          include: {
            category: true,
          },
        });
      } catch (error) {
        console.error(
          "TEMPLATE ERROR:",
          error
        );

        throw error;
      }
    },

    templatesByCategory: async (
      _: unknown,
      {
        categoryId,
      }: {
        categoryId: string;
      }
    ) => {
      try {
        return await prisma.template.findMany({
          where: {
            categoryId,
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.error(
          "CATEGORY TEMPLATE ERROR:",
          error
        );

        throw error;
      }
    },
  },

  Mutation: {
    createTemplate: async (
      _: unknown,
      { input }: any
    ) => {
      try {
        return await prisma.template.create({
          data: {
            title: input.title,
            backgroundImage:
              input.backgroundImage,
            categoryId:
              input.categoryId,
          },
          include: {
            category: true,
          },
        });
      } catch (error) {
        console.error(
          "CREATE TEMPLATE ERROR:",
          error
        );

        throw error;
      }
    },

    updateTemplate: async (
      _: unknown,
      { input }: any
    ) => {
      try {
        return await prisma.template.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            backgroundImage:
              input.backgroundImage,
            categoryId:
              input.categoryId,
          },
          include: {
            category: true,
          },
        });
      } catch (error) {
        console.error(
          "UPDATE TEMPLATE ERROR:",
          error
        );

        throw error;
      }
    },

    deleteTemplate: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      try {
        await prisma.template.delete({
          where: {
            id,
          },
        });

        return true;
      } catch (error) {
        console.error(
          "DELETE TEMPLATE ERROR:",
          error
        );

        throw error;
      }
    },
  },
};