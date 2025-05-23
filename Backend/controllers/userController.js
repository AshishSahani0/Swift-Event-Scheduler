import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import User from "../models/userModels.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import sendEmail from "../utilis/sendEmail.js";
import { generateClubLeaderWelcomeEmailTemplate } from "../utilis/emailTemplates.js";


//Get all verified users
export const getAllUsers = catchAsyncErrors(async(req, res, next) => {
  const users = await User.find({
    accountVerified: true,
    role: "user"
  });
  res.status(200).json({
    success: true,
    count: users.length,
    users
  })
})

// Get all verified Club Leaders
export const getAllClubLeaders = catchAsyncErrors(async (req, res, next) => {
  const clubLeaders = await User.find({
    accountVerified: true,
    role: 'club_leader',
  });

  res.status(200).json({
    success: true,
    count: clubLeaders.length,
    clubLeaders,
  });
});

//Get all verified admins
export const getAllAdmins = catchAsyncErrors(async (req, res, next) => {
  const admins = await User.find({
    accountVerified: true,
    role: 'admin',
  });

  res.status(200).json({
    success: true,
    count: admins.length,
    admins,
  });
});

// Register New Admin
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

// Register Club Leader
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

// Update own profile (User or Club Leader)
export const updateOwnProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) return next(new ErrorHandler("User not found", 404));

  if (name) user.name = name;
  if (email) user.email = email;

  if (password) {
    if (password.length < 8 || password.length > 16) {
      return next(new ErrorHandler("Password must be between 8-16 characters", 400));
    }
    user.password = await bcrypt.hash(password, 10);
    user.passwordUpdated = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});


//update profile only by admin
export const updateProfileByAdmin = catchAsyncErrors(async (req, res, next) => {
  const {name, email, password} = req.body;
  const user = await User.findById(req.params.id).select("+password");
  if (!user) return next(new ErrorHandler("User not found", 404));
  if(user.role === "admin"){
    return next(new ErrorHandler("You cannot update admin profile", 400));
  }
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) {
    if (password.length < 8 || password.length > 16) {
      return next(new ErrorHandler("Password must be between 8-16 characters", 400));
    }
    user.password = await bcrypt.hash(password, 10);
    user.passwordUpdated = true;
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

//Delete user and clubleader only by admin
export const deleteUserorClubLeader = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("You are not authorized to delete", 403));
  }

  
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.role === "admin") {
    return next(new ErrorHandler("You cannot delete another admin profile", 400));
  }

  if (user._id.equals(req.user._id)) {
    return next(new ErrorHandler("You cannot delete your own account", 403));
  }

  
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: `${user.role} deleted successfully`,
  });
});


