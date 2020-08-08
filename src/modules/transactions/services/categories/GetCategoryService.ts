import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICategory from '../../entities/ICategory';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof ICategory)[];
}

@injectable()
class GetCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<ICategory> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const category = await this.categoriesRepository.findById(id, fields);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    return category;
  }
}

export default GetCategoryService;
