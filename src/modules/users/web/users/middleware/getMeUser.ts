import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetUserService from '../../../services/GetUserService';
import IUser from '../../../entities/IUser';

export default async (req: Request, res: Response): Promise<void> => {
  const id = req.tokenUserId;

  const { fields = 'id,fullName,email,avatar' } = req.query;

  const service = container.resolve(GetUserService);

  const user = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof IUser)[],
  });

  res.status(200).send(user);
};
