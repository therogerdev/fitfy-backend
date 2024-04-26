import prisma from "../../prismaClient.js"



export const getAllClasses = async () => {
    return await prisma.classes.findMany()
}
