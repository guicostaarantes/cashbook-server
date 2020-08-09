import { v4 } from 'uuid';
import FakeUsersRepository from '../repositories/users/implementations/FakeUsersRepository';
import FakeSessionsRepository from '../repositories/sessions/implementations/FakeSessionsRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import JWTokenProvider from '../../../shared/providers/TokenProvider/implementations/JWTokenProvider';
import AppError from '../../../shared/errors/AppError';

describe('Authenticate User Service', () => {
  let usersRepository: FakeUsersRepository;
  let sessionsRepository: FakeSessionsRepository;
  let hashProvider: FakeHashProvider;
  let tokenProvider: JWTokenProvider;
  let service: AuthenticateUserService;
  const id = v4();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    sessionsRepository = new FakeSessionsRepository();
    hashProvider = new FakeHashProvider();
    tokenProvider = new JWTokenProvider();
    service = new AuthenticateUserService(
      usersRepository,
      sessionsRepository,
      hashProvider,
      tokenProvider,
    );
  });

  beforeEach(async () => {
    usersRepository.table = [
      {
        id,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        avatar: null,
        password: await hashProvider.hash('Ful4nO*2020'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should get token with correct credentials', async () => {
    const token = await service.execute({
      email: 'fulano@teste.com.br',
      password: 'Ful4nO*2020',
      fingerprint: v4(),
    });
    const payload = await tokenProvider.check(token);
    expect(payload.subject).toBe(id);
    expect(Object.keys(payload)).toHaveLength(4);
  });

  it('Should not get token with incorrect password', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com.br',
        password: 'Ful4nO*2019',
        fingerprint: v4(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not get token with non-existing email', async () => {
    await expect(
      service.execute({
        email: 'fulano@teste.com',
        password: 'Ful4nO*2019',
        fingerprint: v4(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
