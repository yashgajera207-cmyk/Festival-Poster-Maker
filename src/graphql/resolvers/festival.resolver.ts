import { prisma } from "@/lib/prisma";

export const festivalResolver = {
  Query: {
    festivals: async () => {
      const festivals =
        await prisma.festival.findMany({
          orderBy: {
            festivalDate: "asc",
          },
        });

      return festivals.map(
        (festival) => ({
          ...festival,

          festivalDate:
            festival.festivalDate.toISOString(),
        })
      );
    },
  },

  Mutation: {
    createFestival: async (
      _: unknown,
      { input }: any
    ) => {
      return prisma.festival.create({
        data: {
          title: input.title,
          slug: input.slug,
          imageUrl:
            input.imageUrl || null,
          description:
            input.description || null,

          festivalDate:
            new Date(
              input.festivalDate
            ),
        },
      });
    },
  },
};