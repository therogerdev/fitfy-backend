import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../middleware/catchAsync.js";
import * as classesService from "../../Class/service/listClass.service.js";
import { formatSuccessResponse } from "../../../utils/formatSuccessResponse.js";
import { ClassType, Prisma } from "@prisma/client";

export const listClass = catchAsync(async (req: Request, res: Response) => {
  const {
    skip,
    take,
    contains,
    capacityGte,
    orderBy,
    order,
    cursorId,
    coachId,
    classType,
    startTime,
    endTime
  } = req.query;

  const params = {
    skip: skip ? parseInt(skip as string) : undefined,
    take: take ? parseInt(take as string) : undefined,
    cursor: cursorId ? { id: cursorId as string } : undefined,

    where: {
      name: contains ? { contains: contains as string } : undefined,
      capacity: capacityGte ? { gte: parseInt(capacityGte as string) } : undefined,

      // Convert classType to Prisma Enum if provided
      classType: classType ? (classType as ClassType) : undefined,

      // Filter by startTime and endTime range if provided
      startTime: startTime ? { gte: new Date(startTime as string) } : undefined,
      endTime: endTime ? { lte: new Date(endTime as string) } : undefined,

      // Filter by coachId if provided
      coachId: coachId ? coachId as string : undefined
    },

    orderBy: orderBy ? { [orderBy as string]: order as Prisma.SortOrder } : undefined
  };

  const classes = await classesService.listClass(params);


  const formattedResponse = formatSuccessResponse(classes, "class");
  res.status(httpStatus.OK).json(formattedResponse);
});
