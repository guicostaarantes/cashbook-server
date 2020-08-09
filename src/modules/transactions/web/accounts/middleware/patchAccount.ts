import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateAccountService from '../../../services/accounts/UpdateAccountService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: accountId } = req.params;

  const service = container.resolve(UpdateAccountService);

  const account = await service.execute({
    accountId,
    ...req.body,
  });

  res.status(200).send(account);
};
