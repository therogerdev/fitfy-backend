import { Request, Response } from "express";
import catchAsync from "../../../../middleware/catchAsync.js";
import httpStatus from "http-status";
import { searchAthleteService } from "../services/searchAthletes.service.js";
import { formatSuccessResponseWithPagination } from "../../../../utils/formatSuccessResponse.js";

export const searchAthlete = catchAsync(async (req: Request, res: Response) => {
  const { name, page, limit } = req.query as any;

  const searchResults = await searchAthleteService({
    name,
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
  });

  const formattedResponse = formatSuccessResponseWithPagination(
    searchResults.athletes,
    "athlete",
    {
      currentPage: searchResults.currentPage,
      totalPages: searchResults.totalPages,
      totalCount: searchResults.totalCount,
      rowsPerPage: searchResults.rowsPerPage,
    }
  );

  res.status(httpStatus.OK).json(formattedResponse);
});