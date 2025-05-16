import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  resendOTP

} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/login", login);
authRouter.get("/logout", isAuthenticated, logout);
authRouter.get("/me", isAuthenticated, getUser);
authRouter.post("/password/forgot", forgotPassword);
authRouter.put("/password/reset/:token", resetPassword);
authRouter.put("/password/update", isAuthenticated, updatePassword);
authRouter.post("/resend-otp", resendOTP);
export default authRouter;
