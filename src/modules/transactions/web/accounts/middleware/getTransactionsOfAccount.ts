import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListTransactionByAccountService from '../../../services/transactions/ListTransactionByAccountService';
import ITransaction from '../../../entities/transactions/ITransaction';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: accountId } = req.params;

  const { page = '1', fields = 'id,description,value' } = req.query;

  const service = container.resolve(ListTransactionByAccountService);

  const transactions = await service.execute({
    accountId,
    page: +page,
    fields: (fields as string).split(',') as (keyof ITransaction)[],
  });

  res.status(200).send(transactions);
};
