import { v4 } from 'uuid';
import FakeCategoriesRepository from '../../repositories/FakeCategoriesRepository';
import ListCategoryService from './ListCategoryService';
import AppError from '../../../../shared/errors/AppError';

describe('List Category Service', () => {
  let categoriesRepository: FakeCategoriesRepository;
  let service: ListCategoryService;

  beforeAll(() => {
    categoriesRepository = new FakeCategoriesRepository();
    service = new ListCategoryService(categoriesRepository);
  });

  beforeEach(() => {
    categoriesRepository.table = [
      {
        id: v4(),
        name: 'Conta corrente em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: v4(),
        name: 'Conta poupança em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should list categories', async () => {
    await expect(
      service.execute({
        page: 1,
        fields: ['id'],
      }),
    ).resolves.toHaveLength(2);
  });

  it('Should not list categories if page is out of bounds', async () => {
    await expect(
      service.execute({
        page: 2,
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
