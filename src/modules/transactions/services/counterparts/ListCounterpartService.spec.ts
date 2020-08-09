import { v4 } from 'uuid';
import FakeCounterpartsRepository from '../../repositories/counterparts/implementations/FakeCounterpartsRepository';
import ListCounterpartService from './ListCounterpartService';
import AppError from '../../../../shared/errors/AppError';

describe('List Counterpart Service', () => {
  let counterpartsRepository: FakeCounterpartsRepository;
  let service: ListCounterpartService;

  beforeAll(() => {
    counterpartsRepository = new FakeCounterpartsRepository();
    service = new ListCounterpartService(counterpartsRepository);
  });

  beforeEach(() => {
    counterpartsRepository.table = [
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

  it('Should list counterparts', async () => {
    await expect(
      service.execute({
        page: 1,
        fields: ['id'],
      }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list counterparts if page is out of bounds', async () => {
    await expect(
      service.execute({
        page: 2,
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
