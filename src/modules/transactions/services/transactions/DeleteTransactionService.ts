import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import { ITransactionsRepository } from '../../repositories/transactions/ITransactionsRepository';

interface IServiceRequest {
  transactionId: string;
}

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ transactionId }: IServiceRequest): Promise<void> {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
      [],
    );

    if (!transaction) {
      throw new AppError('Transaction not found.', 404);
    }

    await this.transactionsRepository.delete(transaction);
  }
}

export default DeleteTransactionService;
