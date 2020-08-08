import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAccount from '../entities/IAccount';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof IAccount)[];
}

@injectable()
class GetAccountService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<IAccount> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const category = await this.categoriesRepository.findById(id, fields);

    if (!category) {
      throw new AppError('Account not found.', 404);
    }

    return category;
  }
}

export default GetAccountService;
