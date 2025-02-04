import catchAsync from "../../../middleware/catchAsync.js";
import { Request, Response } from "express";
import ApiError from "../../../utils/ApiError.js";
import httpStatus from "http-status";
import * as programService from "./program.service.js";
import { formatProgramToJSONAPI } from "./formatProgramToJSONAPI.js";

export const getAllPrograms = catchAsync(async (req: Request, res: Response) => {
  const programs = await programService.getAllPrograms({
    skip: 0,
    take: 10,
    orderBy: { createdAt: "desc" }
  });

  if (!programs) {
    throw new ApiError(httpStatus.NOT_FOUND, "No programs found");
  }

  // Format the programs to follow JSON:API spec
  const formattedPrograms = programs.map((program) => formatProgramToJSONAPI(program));

  res.json({
    jsonapi: { version: "1.0" },
    meta: { total: programs.length },
    data: formattedPrograms,
    links: {
      self: req.originalUrl
    }
  });
});

export const getProgramBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const program = await programService.getProgramBySlug(slug);

  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, `No program found with slug: ${req.body.slug}`);
  }

  res.json({
    jsonapi: { version: "1.0" },
    meta: {},
    data: formatProgramToJSONAPI(program),
    links: {
      self: req.originalUrl
    }
  });
});

export const createProgram = catchAsync(async (req: Request, res: Response) => {
  const newProgram = await programService.createProgram(req.body);
  if (!newProgram) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Program not created");
  }
  res.json({
    jsonapi: { version: "1.0" },
    meta: {},
    data: formatProgramToJSONAPI(newProgram),
    links: {
      self: req.originalUrl
    }
  });
});

export const updateProgram = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedProgram = await programService.updateProgram(id, req.body);

  if (!updatedProgram) {
    throw new ApiError(httpStatus.NOT_FOUND, "Program not found or update failed");
  }

  res.json({
    jsonapi: { version: "1.0" },
    meta: {},
    data: formatProgramToJSONAPI(updatedProgram),
    links: {
      self: req.originalUrl
    }
  });
});

export const deleteProgram = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Get the program ID from the request parameters

  const deletedProgram = await programService.deleteProgram(id);

  if (!deletedProgram) {
    throw new ApiError(httpStatus.NOT_FOUND, "Program not found or already deleted");
  }

  res.json({ message: "Program deleted successfully" });
});
