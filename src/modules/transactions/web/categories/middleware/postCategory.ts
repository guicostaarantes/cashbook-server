import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCategoryService from '../../../services/categories/CreateCategoryService';

export default async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  const service = container.resolve(CreateCategoryService);

  const category = await service.execute({
    name,
  });

  res.status(200).send(category);
};
