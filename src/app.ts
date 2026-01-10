import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

import { requestLogger } from "./shared/logger/index.js";
import { i18next, handle as i18nextHandle } from "./shared/i18n/index.js";
import { globalErrorHandler as errorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import v1Routes from "./routes/index.js";

const app = express();
app.use(helmet());

app.use(
  cors({
    // Allow all origins (change to specific domain in production, like: origin: process.env.CLIENT_URL)
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Important because cookies are sent via CORS
  })
);

app.use(compression());

app.use(express.json({ limit: "50kb" }));

// i18next instance and middleware handle are imported from the i18n module.
app.use(i18nextHandle(i18next));

app.use(requestLogger);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Mount Routes
app.use("/api/v1/", v1Routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
