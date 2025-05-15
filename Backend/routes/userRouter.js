import express from "express";
import {
  getAllUsers,
  registerNewAdmin,
  registerClubLeader,
} from "../controllers/userController.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Route to get all users (only accessible by admins)
userRouter.get(
  "/all",
  isAuthenticated,
  isAuthorized("admin"),
  getAllUsers
);

// Route to register a new admin (only accessible by admins)
userRouter.post(
  "/add/new-admin",
  isAuthenticated,
  isAuthorized("admin"),
  registerNewAdmin
);

// Route to register a new Club Leader (only accessible by admins)
userRouter.post(
  "/add/new-club-leader",
  isAuthenticated,
  isAuthorized("admin"),
  registerClubLeader
);

export default userRouter;
