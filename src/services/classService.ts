import prisma from "../prismaClient.js";

// type GetAllClasses = z.infer<typeof classSchema>;

export const getAllClasses = async () => {
  return await prisma.session.findMany();
};
