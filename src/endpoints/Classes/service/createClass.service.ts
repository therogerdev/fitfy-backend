import { Prisma } from "@prisma/client";
import prisma from "../../../prismaClient.js";
import httpStatus from "http-status";
import ApiError from "../../../utils/ApiError.js";

export const createClassService = async (classInputData: Prisma.ClassUncheckedCreateInput): Promise<Prisma.ClassGetPayload<{ include: { coach: true } }>> => {
    const classData = classInputData;

    if (classData.coachId) {
      const coachRecord = await prisma.athlete.findUnique({
        where: { id: classData.coachId },
        select: { isCoach: true }
      });

      if (!coachRecord) {
        throw new ApiError(httpStatus.NOT_FOUND, "Coach not found");
      }

      if (!coachRecord.isCoach) {
        throw new ApiError(httpStatus.FORBIDDEN, "Athlete is not a coach");
      }
    }

    const createdClassRecord = await prisma.class.create({
        data: {
          name: classData.name,
          classType: classData.classType,
          description: classData.description,
          startTime: classData.startTime,
          endTime: classData.endTime,
          capacity: classData.capacity,
          createdAt: classData.createdAt,
          updatedAt: classData.updatedAt,
          ...(classData.coachId && {
            coach: {
              connect: { id: classData.coachId }
            }
          })
        },
        include: {
          coach: { // Include all the necessary fields to match the type definition
            select: {
              id: true,
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
              gender: true,
              profileImageUrl: true,
              height: true,
              weight: true,
              isCoach: true,
              stripeCustomerId: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      });

    return createdClassRecord;
  };
