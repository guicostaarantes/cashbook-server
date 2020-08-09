import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateTransactionService from '../../../../../services/transactions/CreateTransactionService';

export default async (req: Request, res: Response): Promise<void> => {
  const {
    accountId,
    categoryId,
    counterpartId,
    description,
    status,
    value,
    referenceDate,
  } = req.body;

  const service = container.resolve(CreateTransactionService);

  const transaction = await service.execute({
    accountId,
    categoryId,
    counterpartId,
    description,
    status,
    value,
    referenceDate,
  });

  res.status(200).send(transaction);
};
