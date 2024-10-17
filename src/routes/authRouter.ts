import { Router } from "express";
import { loginUser, registerUser } from "../endpoints/auth/auth.controller.js";

const authRouter = Router();

// Login Route
authRouter.post("/login", loginUser);

// Signup/Register Route
authRouter.post("/signup", registerUser);

export { authRouter };
