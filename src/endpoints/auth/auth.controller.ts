import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

// Register User (Signup)
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isActive: true, // TODO: You can set this based on your business logic
        role // Make sure to validate allowed roles (admin, member, coach)
      }
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
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
      expiresIn: "1h"
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
