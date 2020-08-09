import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '../../modules/users/repositories/sessions/ISessionsRepository';
import {
  ITokenProvider,
  ITokenPayload,
} from '../providers/TokenProvider/ITokenProvider';
import AppError from '../errors/AppError';

@injectable()
class ValidateAccessTokenService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<ITokenPayload> {
    const payload = await this.tokenProvider.check(token);

    if (payload.type !== 'access-token') {
      throw new AppError('Unauthorized', 401);
    }

    const session = await this.sessionsRepository.findById(payload.sessionId);

    if (!session || session.userId !== payload.subject) {
      throw new AppError('Unauthorized', 401);
    }

    return payload;
  }
}

export default ValidateAccessTokenService;
