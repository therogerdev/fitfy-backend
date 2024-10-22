import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../prismaClient.js";

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  role: Prisma.UserCreateInput["role"];
}

export const registerUser = async (data: RegisterUserData) => {
  const { username, email, password, role } = data;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isActive: true,
        role
      }
    });

    // Return the updated user and Stripe customer info
    return { user };
  } catch (error: any) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};
