import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCounterpartService from '../../../services/counterparts/CreateCounterpartService';

export default async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  const service = container.resolve(CreateCounterpartService);

  const counterparts = await service.execute({
    name,
  });

  res.status(200).send(counterparts);
};
