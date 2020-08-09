import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ITransaction from '../../entities/ITransaction';
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof ITransaction)[];
}

@injectable()
class GetTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<ITransaction> {
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

    const transaction = await this.transactionsRepository.findById(id, fields);

    if (!transaction) {
      throw new AppError('Transaction not found.', 404);
    }

    return transaction;
  }
}

export default GetTransactionService;
