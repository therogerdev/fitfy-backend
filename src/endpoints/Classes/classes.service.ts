import { Prisma } from "@prisma/client";
import prisma from "../../prismaClient.js"



export const getAllClasses = async () => {
    return await prisma.classes.findMany();
}


export const createClass = async (data: Prisma.ClassesCreateInput) => {
    const timestamp = new Date().toISOString();
    return await prisma.classes.create({
        data: {
            ...data,
            startTime: timestamp,
            date: timestamp
        }
    });
}
