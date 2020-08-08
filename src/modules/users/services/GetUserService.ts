import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUser from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof IUser)[];
}

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<IUser> {
    const invalid = fields.some(field => ['password'].includes(field));

    if (invalid) {
      throw new AppError('Bad request', 400);
    }

    const user = await this.usersRepository.findById(id, fields);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

export default GetUserService;
