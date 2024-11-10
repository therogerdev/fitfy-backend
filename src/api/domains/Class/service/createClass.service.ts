import { Prisma } from "@prisma/client";
import { addDays, addWeeks } from "date-fns";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import logger from "../../../../config/logger.js";

type ClassCreationResult = {
  createdClassRecord: Prisma.ClassGetPayload<{
    include: {
      coach: {
        select: {
          id: true;
          firstName: true;
          lastName: true;
          email: true;
          gender: true;
          isCoach: true;
        };
      };
      program: { select: { name: true } };
    };
  }>;
  futureClasses: Array<
    Prisma.ClassGetPayload<{
      include: {
        coach: {
          select: { id: true; firstName: true; lastName: true; email: true; isCoach: true };
        };
      };
    }>
  >;
};

export const createClass = async (
  classInputData: Prisma.ClassUncheckedCreateInput
): Promise<
  | ClassCreationResult
  | Prisma.ClassGetPayload<{
      include: {
        coach: {
          select: { id: true; firstName: true; lastName: true; email: true; isCoach: true };
        };
      };
    }>
> => {
  const classData = classInputData;

  logger.info("Starting class creation process", { classData });

  // Check if the coach exists and is a coach
  if (classData.coachId) {
    logger.info(`Verifying coach with ID: ${classData.coachId}`);

    const coachRecord = await prisma.athlete.findUnique({
      where: { id: classData.coachId },
      select: { isCoach: true }
    });

    if (!coachRecord) {
      logger.error(`Coach with ID ${classData.coachId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, "Coach not found");
    }

    if (!coachRecord.isCoach) {
      logger.error(`Athlete with ID ${classData.coachId} is not a coach`);
      throw new ApiError(httpStatus.FORBIDDEN, "Athlete is not a coach");
    }

    logger.info(`Coach with ID ${classData.coachId} validated successfully`);
  }

  // Create the initial class record
  logger.info("Creating initial class record", { classData });

  const createdClassRecord = await prisma.class.create({
    data: {
      name: classData.name,
      description: classData.description,
      classType: classData.classType,
      date: classData.date,
      capacity: classData.capacity,
      coachId: classData.coachId,
      isRecurring: classData.isRecurring,
      recurrenceType: classData.recurrenceType,
      recurrenceEnd: classData.recurrenceEnd,
      programsId: classData.programsId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      coach: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          gender: true,
          isCoach: true
        }
      },
      program: { select: { name: true } }
    }
  });

  logger.info("Class record created successfully", { createdClassRecord });

  // Generate future class instances if recurring
  const futureClasses = [];
  if (classData.isRecurring && classData.recurrenceType && classData.recurrenceEnd) {
    logger.info("Generating future classes due to recurrence", {
      recurrenceType: classData.recurrenceType,
      recurrenceEnd: classData.recurrenceEnd
    });

    let nextDate = new Date(classData?.date ?? new Date());

    while (nextDate < new Date(classData.recurrenceEnd)) {
      if (classData.recurrenceType === "DAILY") {
        nextDate = addDays(nextDate, 1);
      } else if (classData.recurrenceType === "WEEKLY") {
        nextDate = addWeeks(nextDate, 1);
      }
      if (nextDate > new Date(classData.recurrenceEnd)) break;

      logger.info(`Creating future class for date: ${nextDate.toISOString()}`);

      const futureClass = await prisma.class.create({
        data: {
          name: classData.name,
          description: classData.description,
          classType: classData.classType,
          date: nextDate,
          capacity: classData.capacity,
          coachId: classData.coachId,
          programsId: classData.programsId,
          isRecurring: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          coach: {
            select: { id: true, firstName: true, lastName: true, email: true, isCoach: true }
          }
        }
      });

      futureClasses.push(futureClass);
    }

    logger.info("Future classes generated successfully", { futureClasses });
  }

  return { createdClassRecord, futureClasses };
};
