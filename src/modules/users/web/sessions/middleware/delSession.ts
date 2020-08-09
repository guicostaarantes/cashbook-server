import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DeleteSessionService from '../../../services/DeleteSessionService';

export default async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers;

  const token = authorization.slice(7);

  const service = container.resolve(DeleteSessionService);

  await service.execute({ token });

  res.status(204).send();
};
