import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICategory from '../../entities/ICategory';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IServiceRequest {
  page: number;
  fields: (keyof ICategory)[];
}

@injectable()
class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    page,
    fields,
  }: IServiceRequest): Promise<ICategory[]> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const categories = await this.categoriesRepository.find(page, fields);

    if (!categories.length) {
      throw new AppError('No categories found.', 404);
    }

    return categories;
  }
}

export default ListCategoryService;
