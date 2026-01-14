import './index.js'; // Load reflect-metadata + register.ts
import { container } from 'tsyringe';
import { UsersController } from '../../modules/users/users.controller.js';
import { TOKENS } from './tokens.js';

export const usersController = container.resolve<UsersController>(
  TOKENS.UsersController,
);
