import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListCategoryService from '../../../../../services/categories/ListCategoryService';
import ICategory from '../../../../../entities/ICategory';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = '1', fields = 'id,name' } = req.query;

  const service = container.resolve(ListCategoryService);

  const categories = await service.execute({
    page: +page,
    fields: (fields as string).split(',') as (keyof ICategory)[],
  });

  res.status(200).send(categories);
};
