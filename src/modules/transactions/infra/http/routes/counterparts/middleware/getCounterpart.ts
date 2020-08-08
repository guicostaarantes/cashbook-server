import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetCounterpartService from '../../../../../services/GetCounterpartService';
import ICounterpart from '../../../../../entities/ICounterpart';

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { fields = 'id,name' } = req.query;

  const service = container.resolve(GetCounterpartService);

  const counterpart = await service.execute({
    id,
    fields: (fields as string).split(',') as (keyof ICounterpart)[],
  });

  res.status(200).send(counterpart);
};
