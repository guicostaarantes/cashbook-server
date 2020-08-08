import { v4 } from 'uuid';
import FakeCategoriesRepository from '../repositories/FakeCategoriesRepository';
import UpdateCategoryService from './UpdateCategoryService';
import AppError from '../../../shared/errors/AppError';

describe('Update Category Service', () => {
  let categoriesRepository: FakeCategoriesRepository;
  let service: UpdateCategoryService;
  const id1 = v4();
  const id2 = v4();

  beforeAll(() => {
    categoriesRepository = new FakeCategoriesRepository();
    service = new UpdateCategoryService(categoriesRepository);
  });

  beforeEach(() => {
    categoriesRepository.table = [
      {
        id: id1,
        name: 'Taxas e Impostos',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: id2,
        name: 'Servidor',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should update category', async () => {
    await expect(
      service.execute({
        categoryId: id1,
        name: 'Dividendos',
      }),
    ).resolves.toBeTruthy();
    expect(categoriesRepository.table).toHaveLength(2);
    expect(categoriesRepository.table[0].name).toEqual('Dividendos');
  });

  it('Should not update category with already existing name', async () => {
    await expect(
      service.execute({
        categoryId: id1,
        name: 'Servidor',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(categoriesRepository.table).toHaveLength(2);
    expect(categoriesRepository.table[0].name).toEqual('Taxas e Impostos');
  });
});
