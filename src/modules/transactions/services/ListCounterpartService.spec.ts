import { v4 } from 'uuid';
import FakeAccountsRepository from '../repositories/FakeAccountsRepository';
import ListAccountService from './ListAccountService';
import AppError from '../../../shared/errors/AppError';

describe('List Account Service', () => {
  let accountsRepository: FakeAccountsRepository;
  let service: ListAccountService;

  beforeAll(() => {
    accountsRepository = new FakeAccountsRepository();
    service = new ListAccountService(accountsRepository);
  });

  beforeEach(() => {
    accountsRepository.table = [
      {
        id: v4(),
        name: 'Fornecedor A',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: v4(),
        name: 'Fornecedor B',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list accounts', async () => {
    await expect(
      service.execute({
        page: 1,
        fields: ['id'],
      }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list accounts if page is out of bounds', async () => {
    await expect(
      service.execute({
        page: 2,
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
