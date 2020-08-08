import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAccount from '../entities/IAccount';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

interface IServiceRequest {
  name: string;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({ name }: IServiceRequest): Promise<IAccount> {
    const findByName = await this.accountsRepository.findByName(name, ['id']);

    if (findByName) {
      throw new AppError('There is another account with the same name.', 400);
    }

    const account = await this.accountsRepository.create({
      name,
    });

    return account;
  }
}

export default CreateAccountService;
