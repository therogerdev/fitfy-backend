import { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync.js";
import prisma from "../../prismaClient.js";
import * as classService from "../../services/classService.js";

export const getAllClasses = catchAsync(async (req: Request, res: Response) => {
  const classesData = await classService.getAllClasses();

  res.json(classesData);
});

const classesData = [
  {
    title: "Engine Sweat",
    duration: 45,
    description: "A high intensity workout that will get your heart rate up and keep it there.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 1
  },
  {
    title: "Strength and Conditioning",
    duration: 60,
    description: "A mix of strength and conditioning exercises to build muscle and endurance.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 2
  },
  {
    title: "Mobility",
    duration: 30,
    description: "A class focused on improving flexibility and range of motion.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 3
  },
  {
    title: "Olympic Lifting",
    duration: 60,
    description:
      "A class focused on improving technique and strength in the snatch and clean and jerk.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 4
  },
  {
    title: "Gymnastics",
    duration: 60,
    description: "A class focused on improving bodyweight movements and skills.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 5
  },
  {
    title: "Endurance",
    duration: 60,
    description: "A class focused on improving aerobic capacity and endurance.",
    recurrence: "weekly",
    maxAthletes: 16,
    dayOfWeek: 6
  }
];

export const createClass = catchAsync(async (req: Request, res: Response) => {
  const timestamp = new Date().toISOString();
  const wodClass = await prisma.session.createMany({
    data: classesData.map((classData) => ({
      ...classData,
      startTime: timestamp, // Add the startTime property
      endTime: timestamp // Add the endTime property
    }))
  });
  res.json(wodClass);
});
