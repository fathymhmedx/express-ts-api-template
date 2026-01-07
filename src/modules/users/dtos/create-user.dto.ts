import { z } from "zod";
import { USER_ROLES } from "../../../shared/constants/user-roles.js";

export const createUserSchema = z.object({
  name: z.string().min(2, {
    message: "VALIDATION.MIN_LENGTH",
  }),

  email: z.email({
    message: "VALIDATION.INVALID_EMAIL",
  }),

  password: z.string().min(8, {
    message: "VALIDATION.MIN_LENGTH",
  }),

  role: z.enum(USER_ROLES).optional(),

  phone: z
    .string()
    .regex(/^\+20\d{10}$/, {
      message: "VALIDATION.INVALID_PHONE",
    })
    .optional(),

  profileImage: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
