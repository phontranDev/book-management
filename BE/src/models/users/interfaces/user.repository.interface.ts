import { BaseInterfaceRepository } from '@models/base/interfaces/base.interface.repository';
import { User } from '../entities/user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
