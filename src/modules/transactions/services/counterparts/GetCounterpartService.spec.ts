import { v4 } from 'uuid';
import FakeCounterpartsRepository from '../../repositories/FakeCounterpartsRepository';
import GetCounterpartService from './GetCounterpartService';
import AppError from '../../../../shared/errors/AppError';

describe('Get Counterpart Service', () => {
  let counterpartsRepository: FakeCounterpartsRepository;
  let service: GetCounterpartService;
  const id = v4();

  beforeAll(() => {
    counterpartsRepository = new FakeCounterpartsRepository();
    service = new GetCounterpartService(counterpartsRepository);
  });

  beforeEach(() => {
    counterpartsRepository.table = [
      {
        id,
        name: 'Fornecedor A',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should get counterpart', async () => {
    const counterpart = service.execute({
      id,
      fields: ['id'],
    });
    await expect(counterpart).resolves.toBeTruthy();
    expect((await counterpart).id).toEqual(id);
  });

  it('Should not get counterpart if it does not exist', async () => {
    await expect(
      service.execute({
        id: v4(),
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
