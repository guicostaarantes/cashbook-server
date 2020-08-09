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
  accountId: string;
  categoryId: string;
  counterpartId: string;
  description: string;
  status: EStatus;
  value: number;
  referenceDate: Date;
}

@injectable()
class CreateTransactionService {
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
    accountId,
    categoryId,
    counterpartId,
    description,
    status,
    value,
    referenceDate,
  }: IServiceRequest): Promise<ITransaction> {
    const account = await this.accountsRepository.findById(accountId, []);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    const category = await this.categoriesRepository.findById(categoryId, []);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    const counterpart = await this.counterpartsRepository.findById(
      counterpartId,
      [],
    );

    if (!counterpart) {
      throw new AppError('Counterpart not found.', 404);
    }

    const transaction = await this.transactionsRepository.create({
      accountId,
      categoryId,
      counterpartId,
      description,
      status,
      value,
      referenceDate,
    });

    return transaction;
  }
}

export default CreateTransactionService;
