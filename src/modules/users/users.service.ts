import { inject, injectable } from 'tsyringe';
import { UsersRepository } from './contracts/users.repository.js';
import { TOKENS } from '../../shared/containers/tokens.js';
import { ApiError } from '../../shared/errors/api-error.js';
import { USER_ERRORS } from './users.codes.js';
import { CreateUserDto, UpdateUserDto } from './dtos/index.js';

@injectable()
export class UsersService {
  constructor(
    @inject(TOKENS.UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { id });
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { id });
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { id });
    return deletedUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { email });
    return user;
  }
}
