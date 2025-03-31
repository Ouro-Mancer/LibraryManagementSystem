import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./Database/db.js";
import { errorMiddlewares } from "./Middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";

export const app = express();
config({ path: "./Config/config.env" }); // Load .env first

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

connectDB();

app.use(errorMiddlewares);
