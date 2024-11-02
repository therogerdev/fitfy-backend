import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import * as classesService from "../service/listClass.service.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import { Prisma } from "@prisma/client";

export const listClass = catchAsync(async (req: Request, res: Response) => {
  const { skip, take, contains, orderBy, order, cursorId, coachId, startTime } = req.query;

  // Ensure startTime is always today or later
  const currentDate = new Date();
  const params = {
    skip: skip ? parseInt(skip as string) : undefined,
    take: take ? parseInt(take as string) : undefined,
    cursor: cursorId ? { id: cursorId as string } : undefined,
    where: {
      name: contains ? { contains: contains as string } : undefined,
      startTime: { gte: startTime ? new Date(startTime as string) : currentDate },
      coachId: coachId ? (coachId as string) : undefined
    },
    orderBy: orderBy ? { [orderBy as string]: order as Prisma.SortOrder } : undefined
  };

  const classes = await classesService.listClass(params);

  const formattedResponse = formatSuccessResponse(classes, "class");
  res.status(httpStatus.OK).json(formattedResponse);
});
