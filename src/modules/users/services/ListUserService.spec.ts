import { v4 } from 'uuid';
import FakeUsersRepository from '../repositories/implementations/FakeUsersRepository';
import ListUserService from './ListUserService';
import FakeHashProvider from '../../../shared/providers/HashProvider/implementations/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

describe('List User Service', () => {
  let accountsRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let service: ListUserService;
  const id1 = v4();
  const id2 = v4();

  beforeAll(() => {
    accountsRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new ListUserService(accountsRepository);
  });

  beforeEach(async () => {
    accountsRepository.table = [
      {
        id: id1,
        fullName: 'Fulano da Silva',
        email: 'fulano@teste.com.br',
        avatar: null,
        password: await hashProvider.hash('Ful4nO*2020'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: id2,
        fullName: 'Ciclano da Silva',
        email: 'ciclano@teste.com.br',
        avatar: null,
        password: await hashProvider.hash('Cicl4nO*2020'),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list users', async () => {
    await expect(
      service.execute({
        page: 1,
        fields: ['id'],
      }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list users if page is out of bounds', async () => {
    await expect(
      service.execute({
        page: 2,
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not list users if invlaid field is asked', async () => {
    await expect(
      service.execute({
        page: 2,
        fields: ['id', 'password'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
