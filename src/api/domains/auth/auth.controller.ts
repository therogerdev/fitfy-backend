import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../prismaClient.js";

// Register User (Signup)
import httpStatus from "http-status";
import ApiError from "../../../utils/ApiError.js";
import * as userService from "./auth.service.js"; // Adjust path as per your folder structure

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role, boxId } = req.body;

  try {
    const newUser = await userService.registerUser({
      username,
      email,
      password,
      role,
      boxId
    });

    if (!email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong!");
    }

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
// logout
export const logoutUser = (req: Request, res: Response) => {
  return res.status(200).json({ logout: true, message: "Logout successful" });
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Get user ID from the request

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        isActive: true,
        role: true,
        username: true,
        athlete: {
          include: {
            memberships: {
              select: {
                id: true,
                stripeSubscriptionId: true,
                name: true,
                startDate: true,
                endDate: true,
              }
            }
          }
        },
        athleteId: true,
        boxId: true,
        Box: true
      }
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
