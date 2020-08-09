import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ITransaction from '../../entities/ITransaction';
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICounterpartsRepository } from '../../repositories/ICounterpartsRepository';
import EStatus from '../../entities/EStatus';

interface IServiceRequest {
  transactionId: string;
  accountId?: string;
  categoryId?: string;
  counterpartId?: string;
  description?: string;
  status?: EStatus;
  value?: number;
  referenceDate?: Date;
}

@injectable()
class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('CounterpartsRepository')
    private counterpartsRepository: ICounterpartsRepository,
  ) {}

  public async execute({
    transactionId,
    ...changingFields
  }: IServiceRequest): Promise<ITransaction> {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
      [],
    );

    const validFields = Object.keys(changingFields).every(field =>
      [
        'accountId',
        'categoryId',
        'counterpartId',
        'description',
        'status',
        'value',
        'referenceDate',
      ].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const { accountId, categoryId, counterpartId } = changingFields;

    const findAccount =
      !accountId || (await this.accountsRepository.findById(accountId, []));

    if (!findAccount) {
      throw new AppError('Account not found.', 404);
    }

    const findCategory =
      !categoryId || (await this.categoriesRepository.findById(categoryId, []));

    if (!findCategory) {
      throw new AppError('Category not found.', 404);
    }

    const findCounterpart =
      !counterpartId ||
      (await this.counterpartsRepository.findById(counterpartId, []));

    if (!findCounterpart) {
      throw new AppError('Counterpart not found.', 404);
    }

    const newTransaction = { ...transaction, ...changingFields };

    await this.transactionsRepository.update(newTransaction);

    return newTransaction;
  }
}

export default UpdateTransactionService;
