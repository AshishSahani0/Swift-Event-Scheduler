import express from "express";  
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRouter from "./routes/authRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import expressFileUpload from "express-fileupload";
import removeUnverifiedAccounts from "./services/removeUnverifiedAccounts.js";
dotenv.config();

export const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

connectDB();
app.use(errorMiddleware);
removeUnverifiedAccounts();


export default app;
