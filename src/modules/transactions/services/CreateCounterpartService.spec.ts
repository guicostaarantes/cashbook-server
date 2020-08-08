import FakeCounterpartsRepository from '../repositories/FakeCounterpartsRepository';
import CreateCounterpartService from './CreateCounterpartService';
import AppError from '../../../shared/errors/AppError';

describe('Create Counterpart Service', () => {
  let counterpartsRepository: FakeCounterpartsRepository;
  let service: CreateCounterpartService;

  beforeAll(() => {
    counterpartsRepository = new FakeCounterpartsRepository();
    service = new CreateCounterpartService(counterpartsRepository);
  });

  afterEach(() => {
    counterpartsRepository.table = [];
  });

  it('Should create counterpart', async () => {
    await expect(
      service.execute({
        name: 'Fornecedor A',
      }),
    ).resolves.toBeTruthy();
    expect(counterpartsRepository.table).toHaveLength(1);
  });

  it('Should not create counterpart with already existing name', async () => {
    await expect(
      service.execute({
        name: 'Fornecedor A',
      }),
    ).resolves.toBeTruthy();
    await expect(
      service.execute({
        name: 'Fornecedor A',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(counterpartsRepository.table).toHaveLength(1);
  });
});
