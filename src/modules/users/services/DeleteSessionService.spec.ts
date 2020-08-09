import { v4 } from 'uuid';
import FakeSessionsRepository from '../repositories/sessions/implementations/FakeSessionsRepository';
import DeleteSessionService from './DeleteSessionService';
import FakeTokenProvider from '../../../shared/providers/TokenProvider/implementations/FakeTokenProvider';

describe('Authenticate User Service', () => {
  let sessionsRepository: FakeSessionsRepository;
  let tokenProvider: FakeTokenProvider;
  let service: DeleteSessionService;
  const userId = v4();
  const sessionId = v4();

  beforeAll(() => {
    sessionsRepository = new FakeSessionsRepository();
    tokenProvider = new FakeTokenProvider();
    service = new DeleteSessionService(sessionsRepository, tokenProvider);
  });

  beforeEach(async () => {
    sessionsRepository.table = [
      {
        id: sessionId,
        userId,
        fingerprint: v4(),
        expiresAt: new Date(),
      },
    ];
  });

  it('Should remove session with correct credentials', async () => {
    const token = Buffer.from(
      JSON.stringify({ sub: userId, typ: 'access-token', sessionId }),
    ).toString('base64');
    await service.execute({
      token,
    });
    expect(sessionsRepository.table).toHaveLength(0);
  });

  it('Should not remove session with incorrect credentials', async () => {
    const token = Buffer.from(
      JSON.stringify({ sub: userId, typ: 'access-token', sessionId: v4() }),
    ).toString('base64');
    await service.execute({
      token,
    });
    expect(sessionsRepository.table).toHaveLength(1);
  });
});
