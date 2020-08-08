import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUser from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IServiceRequest {
  page: number;
  fields: (keyof IUser)[];
}

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page, fields }: IServiceRequest): Promise<IUser[]> {
    const validFields = fields.every(field =>
      ['id', 'fullName', 'email', 'avatar'].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const users = await this.usersRepository.find(page, fields);

    if (!users.length) {
      throw new AppError('No users found.', 404);
    }

    return users;
  }
}

export default ListUserService;
