import { v4 } from 'uuid';
import FakeAccountsRepository from '../repositories/FakeAccountsRepository';
import GetAccountService from './GetAccountService';
import AppError from '../../../shared/errors/AppError';

describe('Get Account Service', () => {
  let accountsRepository: FakeAccountsRepository;
  let service: GetAccountService;
  const id = v4();

  beforeAll(() => {
    accountsRepository = new FakeAccountsRepository();
    service = new GetAccountService(accountsRepository);
  });

  beforeEach(() => {
    accountsRepository.table = [
      {
        id,
        name: 'Conta corrente em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should get account', async () => {
    const account = service.execute({
      id,
      fields: ['id'],
    });
    await expect(account).resolves.toBeTruthy();
    expect((await account).id).toEqual(id);
  });

  it('Should not get account if it does not exist', async () => {
    await expect(
      service.execute({
        id: v4(),
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
