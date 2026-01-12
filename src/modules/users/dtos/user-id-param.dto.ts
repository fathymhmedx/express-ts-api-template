import { z } from 'zod';

// ObjectId regex (24 hex chars)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const userIdParamSchema = z.object({
  id: z.string().regex(objectIdRegex, { message: 'VALIDATION_INVALID_ID' }),
});

export type UserIdParamDto = z.infer<typeof userIdParamSchema>;
