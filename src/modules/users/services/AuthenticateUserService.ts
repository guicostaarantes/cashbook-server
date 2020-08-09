import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { addMilliseconds } from 'date-fns';
import ms from 'ms';

import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/users/IUsersRepository';
import { ISessionsRepository } from '../repositories/sessions/ISessionsRepository';
import { IHashProvider } from '../../../shared/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '../../../shared/providers/TokenProvider/ITokenProvider';

interface IServiceRequest {
  email: string;
  password: string;
  fingerprint: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({
    email,
    password,
    fingerprint,
  }: IServiceRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email, [
      'id',
      'password',
    ]);

    if (!user) {
      throw new AppError('Invalid credentials', 403);
    }

    const comparePassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new AppError('Invalid credentials', 403);
    }

    const { id: sessionId } = await this.sessionsRepository.create({
      userId: user.id,
      fingerprint,
      expiresAt: addMilliseconds(new Date(), ms(process.env.JWT_EXPIRES_IN)),
    });

    const token = await this.tokenProvider.generate({
      subject: user.id,
      type: 'access-token',
      sessionId,
    });

    return token;
  }
}

export default AuthenticateUserService;
