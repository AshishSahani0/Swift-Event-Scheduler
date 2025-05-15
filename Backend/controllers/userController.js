import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import User from "../models/userModels.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import sendEmail from "../utilis/sendEmail.js";
import { generateClubLeaderWelcomeEmailTemplate } from "../utilis/emailTemplates.js";
import crypto from "crypto";

// ✅ Get all verified users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ accountVerified: true });
  res.status(200).json({
    success: true,
    users,
  });
});

// ✅ Register New Admin
export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Admin avatar is required", 400));
  }

  let { name, email, password } = req.body;
  email = email.toLowerCase();

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const isRegistered = await User.findOne({ email, accountVerified: true });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 characters long", 400)
    );
  }

  const { avatar } = req.files;
  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("Please upload a valid image", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const normalizedPath = path.resolve(avatar.tempFilePath);

  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(normalizedPath, {
      folder: "Swift_Event_Scheduler",
    });
  } catch (err) {
    return next(new ErrorHandler("Error uploading image", 500));
  }

  const newAdmin = await User.create({
    name,
    email,
    password: hashedPassword,
    accountVerified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    role: "admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    newAdmin,
  });
});

// ✅ Register Club Leader
export const registerClubLeader = catchAsyncErrors(async (req, res, next) => {
  let { name, email, password } = req.body;
  email = email.toLowerCase();

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const existingClubLeader = await User.findOne({
    email,
    accountVerified: true,
  });

  if (existingClubLeader) {
    return next(new ErrorHandler("User already registered", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 characters long", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newClubLeader = await User.create({
    name,
    email,
    password: hashedPassword,
    accountVerified: true,
    role: "club_leader",
  });

  try {
    const html = generateClubLeaderWelcomeEmailTemplate({ name, email, password });

    await sendEmail({
      email: newClubLeader.email,
      subject: "Club Leader Account Created",
      message: html,
    });
  } catch (err) {
    await newClubLeader.deleteOne();
    return next(
      new ErrorHandler("Failed to send email. Club Leader not registered.", 500)
    );
  }

  res.status(201).json({
    success: true,
    message: "Club Leader registered successfully",
  });
});
