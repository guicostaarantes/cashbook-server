import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICategory from '../../entities/categories/ICategory';
import { ICategoriesRepository } from '../../repositories/categories/ICategoriesRepository';

interface IServiceRequest {
  name: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name }: IServiceRequest): Promise<ICategory> {
    const findByName = await this.categoriesRepository.findByName(name, ['id']);

    if (findByName) {
      throw new AppError('There is another category with the same name.', 400);
    }

    const category = await this.categoriesRepository.create({
      name,
    });

    return category;
  }
}

export default CreateCategoryService;
