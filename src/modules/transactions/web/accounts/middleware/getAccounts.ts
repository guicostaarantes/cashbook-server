import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListAccountService from '../../../services/accounts/ListAccountService';
import IAccount from '../../../entities/accounts/IAccount';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = '1', fields = 'id,name' } = req.query;

  const service = container.resolve(ListAccountService);

  const accounts = await service.execute({
    page: +page,
    fields: (fields as string).split(',') as (keyof IAccount)[],
  });

  res.status(200).send(accounts);
};
