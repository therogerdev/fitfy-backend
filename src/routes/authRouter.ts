import { Router } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser
} from "../domains/auth/auth.controller.js";
import { authenticateJWT } from "../domains/auth/authMiddleware.js";

const authRouter = Router();

// Other routes like signup and login
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authenticateJWT, getProfile);

export default authRouter;
