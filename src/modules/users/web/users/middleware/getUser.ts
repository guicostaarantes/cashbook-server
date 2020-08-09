import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetUserService from '../../../services/GetUserService';
import IUser from '../../../entities/users/IUser';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { fields = 'id,fullName,avatar' } = req.query;

  const service = container.resolve(GetUserService);

  const user = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof IUser)[],
  });

  res.status(200).send(user);
};
