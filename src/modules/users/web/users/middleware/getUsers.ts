import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListUserService from '../../../services/ListUserService';
import IUser from '../../../entities/IUser';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = 1, fields = 'id,fullName,avatar' } = req.query;

  const service = container.resolve(ListUserService);

  const users = await service.execute({
    page: +page,
    fields: (fields as string).split(',') as (keyof IUser)[],
  });

  res.status(200).send(users);
};
