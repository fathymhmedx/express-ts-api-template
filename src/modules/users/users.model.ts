import { Schema, model, InferSchemaType } from 'mongoose';
import { USER_ROLES } from '../../shared/constants/user-roles.js';
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User name is required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Email is required'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetCode: {
      type: String,
      select: false,
    },
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    phone: String,
    profileImage: String,
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });

// Type inferred automatically
export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('User', userSchema);
