import express from "express";  
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();

export const app = express();




connectDB();


export default app;
