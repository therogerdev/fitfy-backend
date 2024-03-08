import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";


const prisma = new PrismaClient();


export const getAllBoxes = catchAsync(async (req, res) => {
    const boxes = await prisma.box.findMany();

    if (!boxes) {
      throw new ApiError(httpStatus.NOT_FOUND, "Box not found");
    }

    res.json(boxes);
  });


  export const getBoxById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const box = await prisma.box.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!box) {
      throw new ApiError(httpStatus.NOT_FOUND, "Box not found");
    }

    res.json(box);
  } );
