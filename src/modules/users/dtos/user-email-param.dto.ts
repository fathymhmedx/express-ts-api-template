import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userEmailParamSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, {
      message: "VALIDATION_INVALID_EMAIL",
    })
    .toLowerCase()
    .trim(),
});

export type UserEmailParamDto = z.infer<typeof userEmailParamSchema>;
