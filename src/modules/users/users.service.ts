import { UsersRepository } from "./users.repository.js";
import { User } from "./users.model.js";
import { CreateUserDto, UpdateUserDto } from "./dtos/index.js";
import { ApiError } from "../../shared/errors/api-error.js";
import { USER_ERRORS } from "./users.codes.js";
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.userRepository.create(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { userId });
    return user;
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.update(userId, updateData);
    if (!updatedUser) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { userId });
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userRepository.remove(userId);
    if (!deletedUser) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { userId });
    return deletedUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ApiError(USER_ERRORS.USER_NOT_FOUND, { email });
    return user;
  }
}
