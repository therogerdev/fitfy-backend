import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import prisma from "../../../prismaClient.js";
import { formatSuccessResponseWithPagination } from "../../../utils/formatSuccessResponse.js";

export const listPerformance = catchAsync(async (req: Request, res: Response) => {
  const { athleteId, movementId, workoutId, classId, page, limit } = req.query;

  // Ensure pagination defaults
  const currentPage = parseInt(page as string, 10) || 1;
  const rowsPerPage = parseInt(limit as string, 10) || 10;

  const performanceData = await listPerformanceService({
    athleteId: athleteId as string,
    movementId: movementId as string,
    workoutId: workoutId as string,
    classId: classId as string,
    page: currentPage,
    limit: rowsPerPage
  });

  const formattedResponse = formatSuccessResponseWithPagination(
    performanceData.performances,
    "performance",
    {
      currentPage: performanceData.currentPage,
      totalPages: performanceData.totalPages,
      totalCount: performanceData.totalCount,
      rowsPerPage: performanceData.rowsPerPage
    }
  );

  res.status(httpStatus.OK).json(formattedResponse);
});

export const listPerformanceService = async ({
  athleteId,
  movementId,
  workoutId,
  classId,
  page = 1,
  limit = 10
}: {
  athleteId?: string;
  movementId?: string;
  workoutId?: string;
  classId?: string;
  page?: number;
  limit?: number;
}) => {
  const validatedPage = Math.max(page, 1);
  const validatedLimit = Math.max(limit, 1);

  // Build where clause dynamically
  const where: any = {};
  if (athleteId) where.athleteId = athleteId;
  if (movementId) where.movementId = movementId;
  if (workoutId) where.workoutId = workoutId;
  if (classId) where.classId = classId;

  // Fetch data with pagination
  const performances = await prisma.performance.findMany({
    where,
    skip: (validatedPage - 1) * validatedLimit,
    take: validatedLimit,
    orderBy: { date: "asc" },
    include: {
      athlete: { select: { id: true, firstName: true, lastName: true, profileImageUrl: true } },
      movement: { select: { id: true, name: true, category: true } },
      workout: { select: { id: true, title: true, type: true } },
      class: { select: { id: true, name: true, date: true } }
    }
  });

  // Count total records
  const totalCount = await prisma.performance.count({ where });

  return {
    performances,
    totalCount,
    rowsPerPage: validatedLimit,
    currentPage: validatedPage,
    totalPages: Math.ceil(totalCount / validatedLimit)
  };
};
