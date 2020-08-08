import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAccount from '../entities/IAccount';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

interface IServiceRequest {
  page: number;
  fields: (keyof IAccount)[];
}

@injectable()
class ListAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({ page, fields }: IServiceRequest): Promise<IAccount[]> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const accounts = await this.accountsRepository.find(page, fields);

    if (!accounts.length) {
      throw new AppError('No accounts found.', 404);
    }

    return accounts;
  }
}

export default ListAccountService;
