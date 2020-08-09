import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetTransactionService from '../../../services/transactions/GetTransactionService';
import ITransaction from '../../../entities/transactions/ITransaction';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { fields = 'id,description,value' } = req.query;

  const service = container.resolve(GetTransactionService);

  const transaction = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof ITransaction)[],
  });

  res.status(200).send(transaction);
};
