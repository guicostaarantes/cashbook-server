import { v4 } from 'uuid';
import FakeCounterpartsRepository from '../../repositories/counterparts/implementations/FakeCounterpartsRepository';
import UpdateCounterpartService from './UpdateCounterpartService';
import AppError from '../../../../shared/errors/AppError';

describe('Update Counterpart Service', () => {
  let counterpartsRepository: FakeCounterpartsRepository;
  let service: UpdateCounterpartService;
  const id1 = v4();
  const id2 = v4();

  beforeAll(() => {
    counterpartsRepository = new FakeCounterpartsRepository();
    service = new UpdateCounterpartService(counterpartsRepository);
  });

  beforeEach(() => {
    counterpartsRepository.table = [
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

  it('Should update counterpart', async () => {
    await expect(
      service.execute({
        counterpartId: id1,
        name: 'Nova conta corrente',
      }),
    ).resolves.toBeTruthy();
    expect(counterpartsRepository.table).toHaveLength(2);
    expect(counterpartsRepository.table[0].name).toEqual('Nova conta corrente');
  });

  it('Should not update counterpart with already existing name', async () => {
    await expect(
      service.execute({
        counterpartId: id1,
        name: 'Conta poupança em banco',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(counterpartsRepository.table).toHaveLength(2);
    expect(counterpartsRepository.table[0].name).toEqual(
      'Conta corrente em banco',
    );
  });
});
