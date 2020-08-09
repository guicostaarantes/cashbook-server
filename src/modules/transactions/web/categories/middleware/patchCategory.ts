import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateCategoryService from '../../../services/categories/UpdateCategoryService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: categoryId } = req.params;

  const service = container.resolve(UpdateCategoryService);

  const category = await service.execute({
    categoryId,
    ...req.body,
  });

  res.status(200).send(category);
};
