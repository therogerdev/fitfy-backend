import { Class, Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

// Helper function to generate recurring class instances
const generateRecurringInstances = (classItem: Class, dateRange: { startTime: Date, endTime: Date }): Class[] => {
  const { recurrenceType, recurrenceEnd, isRecurring, startTime, endTime } = classItem;
  const instances: Class[] = [];

  if (!isRecurring || !recurrenceType) {
    return [classItem]; // Return the class as-is if it's not recurring
  }

  const nextStartTime = new Date(startTime as Date);
  const nextEndTime = new Date(endTime as Date);

  while (nextStartTime < recurrenceEnd! && nextStartTime < dateRange.endTime) {
    // Ensure the generated instance falls within the date range
    if (nextStartTime >= dateRange.startTime && nextStartTime <= dateRange.endTime) {
      const newInstance = { ...classItem, startTime: nextStartTime, endTime: nextEndTime };
      instances.push(newInstance);
    }

    // Generate the next occurrence based on recurrenceType
    switch (recurrenceType) {
      case 'WEEKLY':
        nextStartTime.setDate(nextStartTime.getDate() + 7);
        nextEndTime.setDate(nextEndTime.getDate() + 7);
        break;
      case 'BIWEEKLY':
        nextStartTime.setDate(nextStartTime.getDate() + 14);
        nextEndTime.setDate(nextEndTime.getDate() + 14);
        break;
      case 'MONTHLY':
        nextStartTime.setMonth(nextStartTime.getMonth() + 1);
        nextEndTime.setMonth(nextEndTime.getMonth() + 1);
        break;
      // Add other cases for CUSTOM if needed
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
  dateRange: { startTime: Date, endTime: Date };
}): Promise<Class[]> => {
  const { skip, take, cursor, where, orderBy, dateRange } = params;

  // Fetch the base classes based on the provided filters
  const classes = await prisma.class.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });

  // Handle recurring classes by generating future instances
  let allClasses: Class[] = [];

  classes.forEach(classItem => {
    const recurringInstances = generateRecurringInstances(classItem, dateRange);
    allClasses = allClasses.concat(recurringInstances);
  });

  return allClasses;
};
