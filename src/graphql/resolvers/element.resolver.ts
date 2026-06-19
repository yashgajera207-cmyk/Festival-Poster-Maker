import { prisma } from "@/lib/prisma";

export const elementResolver = {
Query: {
elements: async (
_: unknown,
{ templateId }: any
) => {
return prisma.templateElement.findMany({
where: {
templateId,
},
});
},


allElements: async () => {
  return prisma.templateElement.findMany();
},


},

Mutation: {
createElement: async (
_: unknown,
{ input }: any
) => {
return prisma.templateElement.create({
data: input,
});
},


deleteElement: async (
  _: unknown,
  { id }: any
) => {
  await prisma.templateElement.delete({
    where: {
      id,
    },
  });

  return true;
},


},
};
