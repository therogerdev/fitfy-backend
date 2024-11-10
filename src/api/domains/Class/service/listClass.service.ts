import { Class, Prisma } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const listClassService = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ClassWhereUniqueInput;
  where?: Prisma.ClassWhereInput;
  orderBy?: Prisma.ClassOrderByWithRelationInput;
  dateRange?: { startTime: Date; endTime: Date };
}): Promise<{
  classes: Class[];
  totalCount: number;
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
}> => {
  const { skip, take, cursor, orderBy, dateRange } = params;

  const pageSize = take || 10; // Default rows per page is 10
  const page = Math.max(1, Math.floor((skip || 0) / pageSize) + 1); // Calculate current page based on skip
  
  // Define a simplified where clause, only filtering by date
  const updatedWhere: Prisma.ClassWhereInput = dateRange
    ? {
        date: {
          gte: dateRange.startTime,
          lte: dateRange.endTime
        }
      }
    : {};

  // Fetch classes based on the simplified where clause
  const classes = await prisma.class.findMany({
    skip,
    take: pageSize,
    cursor,
    where: updatedWhere,
    orderBy,
    include: {
      coach: {
        select: {
          firstName: true,
          lastName: true,
          profileImageUrl: true
        }
      },
      program: {
        select: {
          name: true
        }
      },
      enrollments: {
        select: {
          athlete: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }
    }
  });

  // Get total count of classes that match the filter (for pagination)
  const totalCount = await prisma.class.count({
    where: updatedWhere
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Return the results along with pagination information
  return {
    classes,
    totalCount,
    rowsPerPage: pageSize,
    currentPage: page,
    totalPages
  };
};
