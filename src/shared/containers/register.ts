import 'reflect-metadata'; // Must be first
import { container } from 'tsyringe';
import { TOKENS } from './tokens.js';

// DB-specific implementations
import { UsersRepository } from '../../infrastructure/database/mongo/users.repository.js';
import { UsersService } from '../../modules/users/users.service.js';
import { UsersController } from '../../modules/users/users.controller.js';

// Bindings
container.registerSingleton(TOKENS.UsersRepository, UsersRepository);
container.registerSingleton(TOKENS.UsersService, UsersService);
container.registerSingleton(TOKENS.UsersController, UsersController);
