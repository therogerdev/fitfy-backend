import { ClassEnrollment } from "@prisma/client";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";
import httpStatus from "http-status";

export const enrollClass = async (data: ClassEnrollment) => {
  // get input data from request

  // check if user is already enrolled in the class
  const classData = await prisma.class.findFirst({
    where: {
      id: data.classId
    },
    include: {
      enrollments: true
    }
  });

  // if enrolled, return error
  if (!classData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
  }

  const isAlreadyEnrolled = classData.enrollments.some(
    (enrollment) => enrollment.athleteId === data.athleteId
  );
  if (isAlreadyEnrolled) {
    throw new ApiError(httpStatus.CONFLICT, "Athlete is already enrolled in this class");
  }

  // check if class capacity is not full: current enrollments < capacity
  if (classData.capacity !== null && classData.enrollments.length >= classData.capacity) {
    throw new ApiError(httpStatus.FORBIDDEN, "Class is full");
  }

  // if not, enroll the user in the class
  const enrollAthlete = await prisma.classEnrollment.create({
    data: {
      athleteId: data.athleteId,
      classId: data.classId
    }
  });

  // return success message
  return enrollAthlete;
};
