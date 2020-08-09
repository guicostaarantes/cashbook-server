import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListTransactionByCounterpartService from '../../../../../services/transactions/ListTransactionByCounterpartService';
import ITransaction from '../../../../../entities/ITransaction';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: counterpartId } = req.params;

  const { page = '1', fields = 'id,description,value' } = req.query;

  const service = container.resolve(ListTransactionByCounterpartService);

  const transactions = await service.execute({
    counterpartId,
    page: +page,
    fields: (fields as string).split(',') as (keyof ITransaction)[],
  });

  res.status(200).send(transactions);
};
