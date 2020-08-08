import { v4 } from 'uuid';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import GetUserService from './GetUserService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

describe('Get User Service', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: GetUserService;
  const id = v4();

  beforeAll(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new GetUserService(usersRepository);
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

  it('Should get user', async () => {
    const user = service.execute({
      id,
      fields: ['id', 'fullName'],
    });
    await expect(user).resolves.toBeTruthy();
    expect((await user).id).toEqual(id);
    expect((await user).fullName).toEqual('Fulano da Silva');
  });

  it('Should not get user if it does not exist', async () => {
    await expect(
      service.execute({
        id: v4(),
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not get user if invalid field is asked', async () => {
    await expect(
      service.execute({
        id,
        fields: ['id', 'password'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
