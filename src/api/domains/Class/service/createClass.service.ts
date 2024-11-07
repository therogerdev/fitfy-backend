import { Prisma } from "@prisma/client";
import { addDays, addWeeks } from "date-fns";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";

type ClassCreationResult = {
  createdClassRecord: Prisma.ClassGetPayload<{
    include: {
      coach: { select: { id: true; firstName: true; lastName: true; email: true; gender: true; isCoach: true; } };
      program: { select: { name: true; } };
    };
  }>;
  futureClasses: Array<Prisma.ClassGetPayload<{
    include: { coach: { select: { id: true; firstName: true; lastName: true; email: true; isCoach: true; } } }
  }>>;
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

  // Check if the coach exists and is a coach
  if (classData.coachId) {
    const coachRecord = await prisma.athlete.findUnique({
      where: { id: classData.coachId },
      select: { isCoach: true }
    });
    if (!coachRecord) throw new ApiError(httpStatus.NOT_FOUND, "Coach not found");
    if (!coachRecord.isCoach) throw new ApiError(httpStatus.FORBIDDEN, "Athlete is not a coach");
  }

  // Create the initial class record, ensuring the `date` field is populated
  const createdClassRecord = await prisma.class.create({
    data: {
      name: classData.name,
      description: classData.description,
      classType: classData.classType,
      date: classData.date, // Set main class date
      startTime: classData.startTime,
      endTime: classData.endTime,
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

  // Generate future class instances if recurring
  const futureClasses = [];
  if (classData.isRecurring && classData.recurrenceType && classData.recurrenceEnd) {
    let nextDate = new Date(classData?.date);

    while (nextDate < new Date(classData.recurrenceEnd)) {
      // Increment date based on recurrence type
      if (classData.recurrenceType === "DAILY") {
        nextDate = addDays(nextDate, 1);
      } else if (classData.recurrenceType === "WEEKLY") {
        nextDate = addWeeks(nextDate, 1);
      }
      if (nextDate > new Date(classData.recurrenceEnd)) break;

      // Create each future class instance with its specific date
      const futureClass = await prisma.class.create({
        data: {
          name: classData.name,
          description: classData.description,
          classType: classData.classType,
          date: nextDate, // Set the specific date for each recurring instance
          startTime: classData.startTime,
          endTime: classData.endTime,
          capacity: classData.capacity,
          coachId: classData.coachId,
          programsId: classData.programsId,
          isRecurring: false, // Future instances are not themselves recurring
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
  }

  return { createdClassRecord, futureClasses };
};
