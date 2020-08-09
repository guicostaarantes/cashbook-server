import { v4 } from 'uuid';
import FakeAccountsRepository from '../../repositories/accounts/implementations/FakeAccountsRepository';
import UpdateAccountService from './UpdateAccountService';
import AppError from '../../../../shared/errors/AppError';

describe('Update Account Service', () => {
  let accountsRepository: FakeAccountsRepository;
  let service: UpdateAccountService;
  const id1 = v4();
  const id2 = v4();

  beforeAll(() => {
    accountsRepository = new FakeAccountsRepository();
    service = new UpdateAccountService(accountsRepository);
  });

  beforeEach(() => {
    accountsRepository.table = [
      {
        id: id1,
        name: 'Conta corrente em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: id2,
        name: 'Conta poupança em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should update account', async () => {
    await expect(
      service.execute({
        accountId: id1,
        name: 'Nova conta corrente',
      }),
    ).resolves.toBeTruthy();
    expect(accountsRepository.table).toHaveLength(2);
    expect(accountsRepository.table[0].name).toEqual('Nova conta corrente');
  });

  it('Should not update account with already existing name', async () => {
    await expect(
      service.execute({
        accountId: id1,
        name: 'Conta poupança em banco',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(accountsRepository.table).toHaveLength(2);
    expect(accountsRepository.table[0].name).toEqual('Conta corrente em banco');
  });
});
