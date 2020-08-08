import { v4 } from 'uuid';
import FakeCategoriesRepository from '../../repositories/FakeCategoriesRepository';
import GetCategoryService from './GetCategoryService';
import AppError from '../../../../shared/errors/AppError';

describe('Get Category Service', () => {
  let categoriesRepository: FakeCategoriesRepository;
  let service: GetCategoryService;
  const id = v4();

  beforeAll(() => {
    categoriesRepository = new FakeCategoriesRepository();
    service = new GetCategoryService(categoriesRepository);
  });

  beforeEach(() => {
    categoriesRepository.table = [
      {
        id,
        name: 'Conta corrente em banco',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });

  it('Should get category', async () => {
    const category = service.execute({
      id,
      fields: ['id'],
    });
    await expect(category).resolves.toBeTruthy();
    expect((await category).id).toEqual(id);
  });

  it('Should not get category if it does not exist', async () => {
    await expect(
      service.execute({
        id: v4(),
        fields: ['id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
