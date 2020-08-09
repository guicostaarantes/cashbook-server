import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListTransactionByCategoryService from '../../../../../services/transactions/ListTransactionByCategoryService';
import ITransaction from '../../../../../entities/ITransaction';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: categoryId } = req.params;

  const { page = '1', fields = 'id,description,value' } = req.query;

  const service = container.resolve(ListTransactionByCategoryService);

  const transactions = await service.execute({
    categoryId,
    page: +page,
    fields: (fields as string).split(',') as (keyof ITransaction)[],
  });

  res.status(200).send(transactions);
};
