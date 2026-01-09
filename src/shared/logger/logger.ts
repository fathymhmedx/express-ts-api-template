import pino, { Logger } from "pino";
import path from "path";
import fs from "fs";

const isDev = process.env.NODE_ENV === "development";
const logsDir = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

let logger: Logger;

if (isDev) {
  // Dev: pretty console logs
  logger = pino({
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  });
} else {
  // Prod: write to file
  const transport = pino.transport({
    target: "pino/file",
    options: { destination: path.join(logsDir, "app.log") },
  });

  // TypeScript-friendly wrapper
  logger = pino({ level: "info" }, transport);
}

export default logger;
