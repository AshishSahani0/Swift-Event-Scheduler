import express from "express";
import {
  getAllUsers,
  getAllClubLeaders,
  registerNewAdmin,
  registerClubLeader,
  getAllAdmins,
  updateOwnProfile,
  updateProfileByAdmin,
  deleteUserorClubLeader,
} from "../controllers/userController.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Route to get all users (only accessible by admins)
userRouter.get(
  "/all-users",
  isAuthenticated,
  isAuthorized("admin"),
  getAllUsers
);

// Route to get all club_leader (only accessible by admins)
userRouter.get(
  "/all-club-leaders",
  isAuthenticated,
  isAuthorized("admin"),
  getAllClubLeaders
);

// Route to get all admins (only accessible by admins)
userRouter.get(
  "/all-admins",
  isAuthenticated,
  isAuthorized("admin"),
  getAllAdmins
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

// Route to update own profile
userRouter.put(
  "/update/profile",
  isAuthenticated,
  isAuthorized("admin", "user", "club_leader"),
  updateOwnProfile
);

//Route to update profile by admins only
userRouter.put(
  "/update/profile/:id",
  isAuthenticated,
  isAuthorized("admin"),
  updateProfileByAdmin
);

//Route to delete User or ClubLeader by Admin
userRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteUserorClubLeader
);
export default userRouter;
