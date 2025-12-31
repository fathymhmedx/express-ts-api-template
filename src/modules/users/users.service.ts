import { UsersRepository } from "./users.repository.js";
import { User } from "./users.model.js";

export class UsersService {
    constructor(private userRepository: UsersRepository) { }

    async createUser(userData: Partial<User>): Promise<User> {
        return this.userRepository.create(userData);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
        const updatedUser = await this.userRepository.update(userId, updateData);
        if (!updatedUser) throw new Error("User not found");
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<User> {
        const deletedUser = await this.userRepository.remove(userId);
        if (!deletedUser) throw new Error("User not found");
        return deletedUser;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("User not found");
        return user;
    }
}

