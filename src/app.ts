import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { requestLogger } from "./shared/logger/index.js";
import { i18next, handle as i18nextHandle } from "./shared/i18n/index.js";

import v1Routes from "./routes/index.js";
const app = express();
// Enhances security by setting appropriate HTTP headers.
app.use(helmet());

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

// Compresses response bodies for all requests to improve performance.
app.use(compression());

// Parses incoming JSON payloads in requests.
app.use(express.json({ limit: "50kb" }));

// i18next instance and middleware handle are imported from the i18n module.
app.use(i18nextHandle(i18next));

// Request Logger
app.use(requestLogger);

// Parses incoming URL-encoded payloads, such as form submissions.
app.use(express.urlencoded({ extended: true }));

// Parses cookies from incoming requests.
app.use(cookieParser());

// Mount Routes
app.use("/api/v1/", v1Routes);

import { globalErrorHandler as errorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
// 404 Not Found Handler
app.use(notFoundHandler);
// Global Error Handler
app.use(errorHandler);

export default app;
