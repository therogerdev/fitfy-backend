import { Class, Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

// Helper function to generate recurring class instances based on date only
const generateRecurringInstances = (
  classItem: Class,
  dateRange: { startTime: Date; endTime: Date }
): Class[] => {
  const { recurrenceType, recurrenceEnd, isRecurring, date, startTime, endTime } = classItem;
  const instances: Class[] = [];

  if (!isRecurring || !recurrenceType || !date) {
    return [classItem]; // Return the original class if it's not recurring or has no date
  }

  const nextDate = new Date(date);
  const nextStartTime = startTime ? new Date(startTime) : null;
  const nextEndTime = endTime ? new Date(endTime) : null;

  while (nextDate <= recurrenceEnd! && nextDate <= dateRange.endTime) {
    if (nextDate >= dateRange.startTime && nextDate <= dateRange.endTime) {
      const newInstance = {
        ...classItem,
        date: new Date(nextDate),
        startTime: nextStartTime ? new Date(nextStartTime) : null,
        endTime: nextEndTime ? new Date(nextEndTime) : null,
      };
      instances.push(newInstance);
    }

    // Increment date based on recurrence type, keeping startTime and endTime consistent
    switch (recurrenceType) {
      case "DAILY":
        nextDate.setDate(nextDate.getDate() + 1);
        if (nextStartTime) nextStartTime.setDate(nextStartTime.getDate() + 1);
        if (nextEndTime) nextEndTime.setDate(nextEndTime.getDate() + 1);
        break;
      case "WEEKLY":
        nextDate.setDate(nextDate.getDate() + 7);
        if (nextStartTime) nextStartTime.setDate(nextStartTime.getDate() + 7);
        if (nextEndTime) nextEndTime.setDate(nextEndTime.getDate() + 7);
        break;
      case "BIWEEKLY":
        nextDate.setDate(nextDate.getDate() + 14);
        if (nextStartTime) nextStartTime.setDate(nextStartTime.getDate() + 14);
        if (nextEndTime) nextEndTime.setDate(nextEndTime.getDate() + 14);
        break;
      case "MONTHLY":
        nextDate.setMonth(nextDate.getMonth() + 1);
        if (nextStartTime) nextStartTime.setMonth(nextStartTime.getMonth() + 1);
        if (nextEndTime) nextEndTime.setMonth(nextEndTime.getMonth() + 1);
        break;
    }
  }

  return instances;
};
export const listClass = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ClassWhereUniqueInput;
  where?: Prisma.ClassWhereInput;
  orderBy?: Prisma.ClassOrderByWithRelationInput;
  dateRange?: { startTime: Date; endTime: Date };
}): Promise<Class[]> => {
  const { skip, take, cursor, orderBy, dateRange } = params;

  console.log("Date Range Provided:", dateRange);

  // Define a simplified where clause, only filtering by date
  const updatedWhere: Prisma.ClassWhereInput = dateRange
    ? {
        date: {
          gte: dateRange.startTime,
          lte: dateRange.endTime,
        },
      }
    : {};

  console.log("Constructed Where Clause:", JSON.stringify(updatedWhere, null, 2));

  // Fetch classes based on the simplified where clause
  const classes = await prisma.class.findMany({
    skip,
    take,
    cursor,
    where: updatedWhere,
    orderBy,
    include: {
      coach: {
        select: {
          firstName: true,
          lastName: true,
          profileImageUrl: true,
        },
      },
      program: {
        select: {
          name: true,
        },
      },
      enrollments: {
        select: {
          athlete: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  console.log("Query Result:", classes);

  return classes;
};
