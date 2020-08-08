import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICategory from '../../entities/ICategory';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IServiceRequest {
  categoryId: string;
  name?: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    categoryId,
    ...changingFields
  }: IServiceRequest): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(categoryId, []);

    const validFields = Object.keys(changingFields).every(field =>
      ['name'].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const { name } = changingFields;

    const findByName =
      name && (await this.categoriesRepository.findByName(name, ['id']));

    if (findByName && findByName.id !== categoryId) {
      throw new AppError('There is another category with the same name.', 400);
    }

    const newCategory = { ...category, ...changingFields };

    await this.categoriesRepository.update(newCategory);

    return newCategory;
  }
}

export default UpdateCategoryService;
