import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IAccount from '../entities/IAccount';
import { IAccountsRepository } from '../repositories/IAccountsRepository';

interface IServiceRequest {
  accountId: string;
  name?: string;
}

@injectable()
class UpdateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({
    accountId,
    ...changingFields
  }: IServiceRequest): Promise<IAccount> {
    const account = await this.accountsRepository.findById(accountId, []);

    const invalid = Object.keys(changingFields).some(field =>
      ['id'].includes(field),
    );

    if (invalid) {
      throw new AppError('Bad request', 400);
    }

    const { name } = changingFields;

    const findByName =
      name && (await this.accountsRepository.findByName(name, ['id']));

    if (findByName) {
      throw new AppError('There is another account with the same name.', 400);
    }

    const newAccount = { ...account, ...changingFields };

    await this.accountsRepository.update(newAccount);

    return newAccount;
  }
}

export default UpdateAccountService;
