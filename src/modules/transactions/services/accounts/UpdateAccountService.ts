import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IAccount from '../../entities/accounts/IAccount';
import { IAccountsRepository } from '../../repositories/accounts/IAccountsRepository';

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

    const validFields = Object.keys(changingFields).every(field =>
      ['name'].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const { name } = changingFields;

    const findByName =
      name && (await this.accountsRepository.findByName(name, ['id']));

    if (findByName && findByName.id !== accountId) {
      throw new AppError('There is another account with the same name.', 400);
    }

    const newAccount = { ...account, ...changingFields };

    await this.accountsRepository.update(newAccount);

    return newAccount;
  }
}

export default UpdateAccountService;
