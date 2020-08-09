import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IAccount from '../../entities/accounts/IAccount';
import { IAccountsRepository } from '../../repositories/accounts/IAccountsRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof IAccount)[];
}

@injectable()
class GetAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<IAccount> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const account = await this.accountsRepository.findById(id, fields);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    return account;
  }
}

export default GetAccountService;
