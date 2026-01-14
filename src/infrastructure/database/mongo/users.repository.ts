// infrastructure/database/mongo/users.repository.ts
import { injectable } from 'tsyringe';
import { MongoBaseRepository } from './base.repository.js';
import { UsersRepository as UsersRepositoryContract } from '../../../modules/users/contracts/users.repository.js';
import { User, UserModel } from '../../../modules/users/users.model.js';

@injectable()
export class UsersRepository
  extends MongoBaseRepository<User>
  implements UsersRepositoryContract
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }
}
