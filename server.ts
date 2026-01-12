import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config({ debug: process.env.NODE_ENV === 'development' });

import { env } from './src/shared/config/env.js';

import type { Server } from 'http';
import app from './src/app.js';
import { connectDB } from './src/shared/config/database.js';
import { initI18n } from './src/shared/i18n/index.js';

let server: Server;

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION!, Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// START SERVER
const startServer = async () => {
  try {
    //1.i18n fisrt
    await initI18n();

    //2. DB
    await connectDB();

    //3. Server
    server = app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};

startServer();

// UNHANDLED REJECTION
process.on('unhandledRejection', (reason: unknown) => {
  console.error('UNHANDLED REJECTION!, Shutting down...');

  if (reason instanceof Error) {
    console.error(reason.name, reason.message);
    console.error(reason.stack);
  } else {
    console.error('Non-Error rejection:', reason);
  }

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
