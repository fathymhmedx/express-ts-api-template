import { BaseRepository } from '../../../shared/contracts/base.repository.js';
import { User } from '../users.model.js';

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
