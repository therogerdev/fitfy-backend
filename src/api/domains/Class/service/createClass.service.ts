
import { Prisma } from "@prisma/client";
import { addDays, addWeeks } from "date-fns";
import httpStatus from "http-status";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";


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
    };
  }>;
  futureClasses: Array<
    Prisma.ClassGetPayload<{
      include: {
        coach: {
          select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
            isCoach: true;
          };
        };
      };
    }>
  >;
};

export const createClass = async (
  classInputData: Prisma.ClassUncheckedCreateInput
): Promise<ClassCreationResult | Prisma.ClassGetPayload<{
  include: {
    coach: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        isCoach: true;
      };
    };
  };
}>> => {
  const classData = classInputData;

  // Verify if coach exists and is an actual coach
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

  // Create the first class record
  const createdClassRecord = await prisma.class.create({
    data: {
      name: classData.name,
      description: classData.description,
      classType: classData.classType,
      startTime: classData.startTime,
      endTime: classData.endTime,
      capacity: classData.capacity,
      coachId: classData.coachId,
      isRecurring: classData.isRecurring,
      recurrenceType: classData.recurrenceType,
      recurrenceEnd: classData.recurrenceEnd,
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
      }
    }
  });

  // Handle recurrence if the class is marked as recurring
  if (classData.isRecurring && classData.recurrenceType && classData.recurrenceEnd) {
    const recurrenceType = classData.recurrenceType;
    const recurrenceEnd = new Date(classData.recurrenceEnd);
    const futureClasses = [];

    let nextStartTime = new Date(classData.startTime as Date);
    let nextEndTime = new Date(classData.endTime as Date);

    // Create future instances of the class until the recurrenceEnd date is reached
    while (nextStartTime < recurrenceEnd) {
      // Increment the start and end times based on the recurrence type (e.g., daily or weekly)
      if (recurrenceType === "DAILY") {
        nextStartTime = addDays(nextStartTime, 1);
        nextEndTime = addDays(nextEndTime, 1);
      } else if (recurrenceType === "WEEKLY") {
        nextStartTime = addWeeks(nextStartTime, 1);
        nextEndTime = addWeeks(nextEndTime, 1);
      }

      if (nextStartTime > recurrenceEnd) break;

      // Create future class instances
      const futureClass = await prisma.class.create({
        data: {
          name: classData.name,
          description: classData.description,
          classType: classData.classType,
          startTime: nextStartTime,
          endTime: nextEndTime,
          capacity: classData.capacity,
          coachId: classData.coachId,
          isRecurring: false, // Future instances are not recurring themselves
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
              isCoach: true
            }
          }
        }
      });

      futureClasses.push(futureClass);
    }

    return { createdClassRecord, futureClasses };
  }

  return createdClassRecord;
};
