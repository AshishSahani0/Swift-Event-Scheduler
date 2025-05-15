import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user", "club_leader"],
      default: "user",
    },
    passwordUpdated: {
      type: Boolean,
      default: function () {
        return this.role !== "club_leader"; // Only club leaders need to update password
      },
    },

    accountVerified: {
      type: Boolean,
      default: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },

    verificationCode: Number,
    verificationCodeExpire: Date,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateVerificationCode = function () {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const code = parseInt(`${firstDigit}${remainingDigits}`);
  this.verificationCode = code;
  this.verificationCodeExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return code;
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
