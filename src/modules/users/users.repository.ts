import { BaseRepository } from "../../shared/repositories/base.repository.js";
import { UserModel, User } from "./users.model.js";

export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }
}