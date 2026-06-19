import { prisma } from "@/lib/prisma";

export const userPosterLayoutResolver = {
  Query: {
    userPosterLayouts: async (
      _: unknown,
      { templateId }: { templateId: string },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      console.log(
        "FETCH USER LAYOUT",
        context.user.id,
        templateId
      );

      return prisma.userPosterLayout.findMany({
        where: {
          userId: context.user.id,
          templateId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },

  Mutation: {
    saveUserPosterLayout: async (
      _: unknown,
      { elements }: any,
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      console.log(
        "SAVE LAYOUT ELEMENTS:",
        elements
      );

      if (
        !elements ||
        !Array.isArray(elements) ||
        elements.length === 0
      ) {
        throw new Error(
          "No layout elements found"
        );
      }

      const templateId =
        elements[0]?.templateId;

      if (!templateId) {
        throw new Error(
          "Template ID missing"
        );
      }

      await prisma.userPosterLayout.deleteMany({
        where: {
          userId: context.user.id,
          templateId,
        },
      });

      await prisma.userPosterLayout.createMany({
        data: elements.map(
          (item: any) => ({
            userId: context.user.id,

            templateId:
              item.templateId,

            elementType:
              item.elementType,

            xPosition:
              item.xPosition,

            yPosition:
              item.yPosition,

            width:
              item.width,

            height:
              item.height,

            fontSize:
              item.fontSize || null,

            fontWeight:
              item.fontWeight || null,

            textColor:
              item.textColor || null,
          })
        ),
      });

      return true;
    },
  },
}; 