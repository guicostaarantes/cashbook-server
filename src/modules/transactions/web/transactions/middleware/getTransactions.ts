import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListTransactionService from '../../../services/transactions/ListTransactionService';
import ITransaction from '../../../entities/transactions/ITransaction';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = '1', fields = 'id,description,value' } = req.query;

  const service = container.resolve(ListTransactionService);

  const transactions = await service.execute({
    page: +page,
    fields: (fields as string).split(',') as (keyof ITransaction)[],
  });

  res.status(200).send(transactions);
};
