import { Router } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser
} from "../endpoints/auth/auth.controller.js";
import { authenticateJWT } from "../endpoints/auth/authMiddleware.js";

const authRouter = Router();

// Other routes like signup and login
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authenticateJWT, getProfile);

export default authRouter;
