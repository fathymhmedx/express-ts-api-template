import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env first
dotenv.config({ path: path.resolve(process.cwd(), '.env'), debug: true });

// Zod schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    message: 'NODE_ENV must be one of: development, production, test',
  }),
  PORT: z
    .string({
      message: 'PORT is required',
    })
    .transform(Number),
  DB_URI: z
    .string({
      message: 'DB_URI is required',
    })
    .refine(
      (val) =>
        val.includes('<db_password>') || val.startsWith('mongodb+srv://'),
      {
        message:
          'DB_URI must be a valid MongoDB URI with <db_password> placeholder',
      },
    ),
  DB_PASS: z.string({ message: 'DB_PASS is required' }),
  JWT_SECRET_KEY: z.string({ message: 'JWT_SECRET_KEY is required' }).min(10),
  JWT_EXPIRES_IN: z.string({ message: 'JWT_EXPIRES_IN is required' }),
  JWT_REFRESH_SECRET_KEY: z
    .string({ message: 'JWT_REFRESH_SECRET_KEY is required' })
    .min(10),
  JWT_REFRESH_EXPIRES_IN: z.string({
    message: 'JWT_REFRESH_EXPIRES_IN is required',
  }),
  CLIENT_URL: z.string().optional(),
});

// Validate process.env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  parsed.error.issues.forEach((issue) => {
    console.error(` - ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

// Export typed environment
export const env = parsed.data;
