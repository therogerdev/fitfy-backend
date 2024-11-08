import { Class } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import prisma from "../../../../prismaClient.js";

export const newlistClass = catchAsync(async (req: Request, res: Response) => {
  const { athleteId } = req.query;

  const classes = await listClassService(athleteId || "" );

  const formattedResponse = formatSuccessResponse(classes, "class");
  res.status(httpStatus.OK).json(formattedResponse);
});

export const listClassService = async ( athleteId: string ): Promise<Class[]> => {
  
const classes = await prisma.class.findMany({
    where: {
        enrollments: {
            every: {
                athleteId: athleteId
            }, 
        }
    } , include: {
        enrollments: {
            select: {
                athlete: {
                    select: {
                        firstName: true
                    }
                }
            }
        }
    }
})  
  return classes
};
