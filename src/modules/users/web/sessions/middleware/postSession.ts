import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default async (req: Request, res: Response): Promise<void> => {
  const { email, password, fingerprint } = req.body;

  const service = container.resolve(AuthenticateUserService);

  const token = await service.execute({
    email,
    password,
    fingerprint,
  });

  res.status(200).send({ token });
};
