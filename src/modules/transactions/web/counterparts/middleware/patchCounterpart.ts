import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateCounterpartService from '../../../services/counterparts/UpdateCounterpartService';

export default async (req: Request, res: Response): Promise<void> => {
  const { id: counterpartId } = req.params;

  const service = container.resolve(UpdateCounterpartService);

  const counterpart = await service.execute({
    counterpartId,
    ...req.body,
  });

  res.status(200).send(counterpart);
};
