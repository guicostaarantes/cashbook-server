import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetAccountService from '../../../../../services/accounts/GetAccountService';
import IAccount from '../../../../../entities/IAccount';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { fields = 'id,name' } = req.query;

  const service = container.resolve(GetAccountService);

  const account = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof IAccount)[],
  });

  res.status(200).send(account);
};
