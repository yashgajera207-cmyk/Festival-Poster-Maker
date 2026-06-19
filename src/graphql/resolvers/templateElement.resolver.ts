import { prisma } from "@/lib/prisma";

export const templateElementResolver = {
  Mutation: {
    saveTemplateElements: async (
      _: unknown,
      { elements }: any
    ) => {
      try {
        if (!elements?.length) {
          return false;
        }

        const templateId =
          elements[0].templateId;

        await prisma.templateElement.deleteMany({
          where: {
            templateId,
          },
        });

        await prisma.templateElement.createMany({
          data: elements.map(
            (element: any) => ({
              templateId:
                element.templateId,

              elementType:
                element.elementType,

              xPosition:
                element.xPosition,

              yPosition:
                element.yPosition,

              width:
                element.width,

              height:
                element.height,
            })
          ),
        });

        return true;
      } catch (error) {
        console.error(
          "SAVE TEMPLATE ELEMENTS ERROR:",
          error
        );

        throw error;
      }
    },
  },
};