import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ITransaction from '../../entities/ITransaction';
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository';

interface IServiceRequest {
  page: number;
  fields: (keyof ITransaction)[];
}

@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
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

    const transactions = await this.transactionsRepository.find(page, fields);

    if (!transactions.length) {
      throw new AppError('No transactions found.', 404);
    }

    return transactions;
  }
}

export default ListTransactionService;
