import { z } from "zod";
import { USER_ROLES } from "../../../shared/constants/user-roles.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserSchema = z
  .object({
    name: z.string().min(2, {
      message: "VALIDATION_MIN_LENGTH",
    }),

    email: z
      .string()
      .regex(emailRegex, {
        message: "VALIDATION_INVALID_EMAIL",
      })
      .toLowerCase()
      .trim(),

    password: z.string().min(8, {
      message: "VALIDATION_MIN_LENGTH",
    }),

    role: z.enum(USER_ROLES).optional(),

    phone: z
      .string()
      .regex(/^\+20\d{10}$/, {
        message: "VALIDATION_INVALID_PHONE",
      })
      .optional(),

    profileImage: z.string().optional(),
  })
  .strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
