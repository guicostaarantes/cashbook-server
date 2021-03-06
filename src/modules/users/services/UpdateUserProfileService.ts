import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/users/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IUser from '../entities/users/IUser';

interface IServiceRequest {
  userId: string;
  fullName?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    ...changingFields
  }: IServiceRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId, []);

    const validFields = Object.keys(changingFields).every(field =>
      ['fullName'].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const newUser = { ...user, ...changingFields };

    await this.usersRepository.update(newUser);

    return newUser;
  }
}

export default UpdateUserProfileService;
