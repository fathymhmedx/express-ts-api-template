import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";

import v1Routes from "./routes/index.js";
const app = express();

// Enhances security by setting appropriate HTTP headers.
app.use(helmet());

// Logs HTTP requests for debugging and monitoring purposes.
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Parses incoming JSON payloads in requests.
app.use(express.json({ limit: "50kb" }));

// Parses incoming URL-encoded payloads, such as form submissions.
app.use(express.urlencoded({ extended: true }));

// Parses cookies from incoming requests.
app.use(cookieParser());

// CORS (before cookies): Enables Cross-Origin Resource Sharing (CORS).
app.use(
  cors({
    // Allow all origins (change to specific domain in production, like: origin: process.env.CLIENT_URL)
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Important because cookies are sent via CORS
  })
);

// Mount Routes
app.use("/api/v1/", v1Routes);

export default app;
