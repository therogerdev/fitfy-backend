import httpStatus from "http-status";
import prisma from "../../prismaClient.js";
import ApiError from "../../utils/ApiError.js";
import catchAsync from "../../utils/catchAsync.js";

export const createAthlete = catchAsync(async (req, res) => {
    const { firstName, lastName, email, isCoach, isOwner, } = req.body;

    const existingAthlete = await prisma.athlete.findUnique({
      where: {
        email
      }
    });

    if (existingAthlete) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Athlete with this email already exists");
    }

    const athlete = await prisma.athlete.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        isCoach: isCoach,
        isOwner: isOwner,
        gender: "male",
        profileImageUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      }
    });
    res.json(athlete);
  });
