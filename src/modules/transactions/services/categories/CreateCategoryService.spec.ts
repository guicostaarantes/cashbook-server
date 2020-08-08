import FakeCategoriesRepository from '../../repositories/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '../../../../shared/errors/AppError';

describe('Create Category Service', () => {
  let categoriesRepository: FakeCategoriesRepository;
  let service: CreateCategoryService;

  beforeAll(() => {
    categoriesRepository = new FakeCategoriesRepository();
    service = new CreateCategoryService(categoriesRepository);
  });

  afterEach(() => {
    categoriesRepository.table = [];
  });

  it('Should create category', async () => {
    await expect(
      service.execute({
        name: 'Taxas e impostos',
      }),
    ).resolves.toBeTruthy();
    expect(categoriesRepository.table).toHaveLength(1);
  });

  it('Should not create category with already existing name', async () => {
    await expect(
      service.execute({
        name: 'Taxas e impostos',
      }),
    ).resolves.toBeTruthy();
    await expect(
      service.execute({
        name: 'Taxas e impostos',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(categoriesRepository.table).toHaveLength(1);
  });
});
