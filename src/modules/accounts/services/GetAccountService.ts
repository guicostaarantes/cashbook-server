import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAccount from '../entities/IAccount';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

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
    const account = await this.accountsRepository.findById(id, fields);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    return account;
  }
}

export default GetAccountService;
