import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAccountService from '../../../../../services/accounts/CreateAccountService';

export default async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  const service = container.resolve(CreateAccountService);

  const account = await service.execute({
    name,
  });

  res.status(200).send(account);
};
