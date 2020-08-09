import { v4 } from 'uuid';
import { JsonWebTokenError } from 'jsonwebtoken';
import ValidateAccessTokenService from './ValidateAccessTokenService';
import FakeSessionsRepository from '../../modules/users/repositories/sessions/implementations/FakeSessionsRepository';
import FakeTokenProvider from '../providers/TokenProvider/implementations/FakeTokenProvider';
import AppError from '../errors/AppError';

describe('Validate Access Token Service', () => {
  let sessionsRepository: FakeSessionsRepository;
  let tokenProvider: FakeTokenProvider;
  let service: ValidateAccessTokenService;
  const userId = v4();
  const sessionId = v4();

  beforeAll(() => {
    sessionsRepository = new FakeSessionsRepository();
    tokenProvider = new FakeTokenProvider();
    service = new ValidateAccessTokenService(sessionsRepository, tokenProvider);

    sessionsRepository.table = [
      {
        id: sessionId,
        userId,
        fingerprint: v4(),
        expiresAt: new Date(),
      },
    ];
  });

  it('Should get payload from valid token', async () => {
    const token = await tokenProvider.generate({
      subject: userId,
      type: 'access-token',
      sessionId,
    });
    await expect(service.execute(token)).resolves.toHaveProperty(
      'subject',
      userId,
    );
  });

  it('Should throw error if sessionId is not in database', async () => {
    const token = await tokenProvider.generate({
      subject: userId,
      type: 'access-token',
      sessionId: v4(),
    });
    await expect(service.execute(token)).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error if invalid token is received', async () => {
    await expect(service.execute('wrong-token')).rejects.toBeInstanceOf(
      JsonWebTokenError,
    );
  });

  it('Should throw error if token is valid but type is not access-token', async () => {
    const token = await tokenProvider.generate({
      subject: userId,
      type: 'forgot-password',
    });
    await expect(service.execute(token)).rejects.toBeInstanceOf(AppError);
  });
});
