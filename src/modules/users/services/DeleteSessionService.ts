import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '../repositories/sessions/ISessionsRepository';
import { ITokenProvider } from '../../../shared/providers/TokenProvider/ITokenProvider';

interface IServiceRequest {
  token: string;
}

@injectable()
class DeleteSessionService {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ token }: IServiceRequest): Promise<void> {
    const payload = await this.tokenProvider.decode(token);

    await this.sessionsRepository.deleteById(payload.sessionId);
  }
}

export default DeleteSessionService;
