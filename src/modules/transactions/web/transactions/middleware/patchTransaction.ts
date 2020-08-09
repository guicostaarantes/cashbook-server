import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateTransactionService from '../../../services/transactions/UpdateTransactionService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: transactionId } = req.params;

  const service = container.resolve(UpdateTransactionService);

  const transaction = await service.execute({
    transactionId,
    ...req.body,
  });

  res.status(200).send(transaction);
};
