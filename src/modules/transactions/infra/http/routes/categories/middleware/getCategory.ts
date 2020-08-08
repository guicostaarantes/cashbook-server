import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetCategoryService from '../../../../../services/GetCategoryService';
import ICategory from '../../../../../entities/ICategory';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { fields = 'id,name' } = req.query;

  const service = container.resolve(GetCategoryService);

  const account = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof ICategory)[],
  });

  res.status(200).send(account);
};
