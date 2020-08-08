import FakeAccountsRepository from '../../repositories/FakeAccountsRepository';
import CreateAccountService from './CreateAccountService';
import AppError from '../../../../shared/errors/AppError';

describe('Create Account Service', () => {
  let accountsRepository: FakeAccountsRepository;
  let service: CreateAccountService;

  beforeAll(() => {
    accountsRepository = new FakeAccountsRepository();
    service = new CreateAccountService(accountsRepository);
  });

  afterEach(() => {
    accountsRepository.table = [];
  });

  it('Should create account', async () => {
    await expect(
      service.execute({
        name: 'Conta corrente em banco',
      }),
    ).resolves.toBeTruthy();
    expect(accountsRepository.table).toHaveLength(1);
  });

  it('Should not create account with already existing name', async () => {
    await expect(
      service.execute({
        name: 'Conta corrente em banco',
      }),
    ).resolves.toBeTruthy();
    await expect(
      service.execute({
        name: 'Conta corrente em banco',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(accountsRepository.table).toHaveLength(1);
  });
});
