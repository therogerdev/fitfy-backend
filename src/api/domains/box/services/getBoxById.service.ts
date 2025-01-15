
import prisma from "../../../../prismaClient.js";
import { BoxIdSchema } from "./createBox.service.js";



export const getBoxById = async (id: BoxIdSchema) => {
    return await prisma.box.findUnique({
      where: { id }
    });
  };
