import { z } from "zod";
import { USER_ROLES } from "../../../shared/constants/user-roles.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "VALIDATION_MIN_LENGTH",
      })
      .optional(),

    email: z
      .string()
      .regex(emailRegex, {
        message: "VALIDATION_INVALID_EMAIL",
      })
      .toLowerCase()
      .trim()
      .optional(),

    password: z
      .string()
      .min(8, {
        message: "VALIDATION_MIN_LENGTH",
      })
      .optional(),

    role: z.enum(USER_ROLES).optional(),

    phone: z
      .string()
      .regex(/^\+20\d{10}$/, {
        message: "VALIDATION_INVALID_PHONE",
      })
      .optional(),

    profileImage: z.string().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "VALIDATION_BODY_EMPTY",
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
