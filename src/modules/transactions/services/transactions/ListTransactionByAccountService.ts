import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ITransaction from '../../entities/transactions/ITransaction';
import { ITransactionsRepository } from '../../repositories/transactions/ITransactionsRepository';

interface IServiceRequest {
  accountId: string;
  page: number;
  fields: (keyof ITransaction)[];
}

@injectable()
class ListTransactionByAccountService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    accountId,
    page,
    fields,
  }: IServiceRequest): Promise<ITransaction[]> {
    const validFields = fields.every(field =>
      [
        'id',
        'account',
        'category',
        'counterpart',
        'description',
        'status',
        'value',
        'referenceDate',
      ].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const transactions = await this.transactionsRepository.findByAccountId(
      accountId,
      page,
      fields,
    );

    if (!transactions.length) {
      throw new AppError('No transactions found.', 404);
    }

    return transactions;
  }
}

export default ListTransactionByAccountService;
