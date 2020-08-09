import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DeleteTransactionService from '../../../../../services/transactions/DeleteTransactionService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: transactionId } = req.params;

  const service = container.resolve(DeleteTransactionService);

  await service.execute({ transactionId });

  res.status(204).send();
};
