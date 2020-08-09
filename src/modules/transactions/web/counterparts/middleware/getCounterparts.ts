import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListCounterpartService from '../../../services/counterparts/ListCounterpartService';
import ICounterpart from '../../../entities/counterparts/ICounterpart';

export default async (req: Request, res: Response): Promise<void> => {
  const { page = '1', fields = 'id,name' } = req.query;

  const service = container.resolve(ListCounterpartService);

  const counterparts = await service.execute({
    page: +page,
    fields: (fields as string).split(',') as (keyof ICounterpart)[],
  });

  res.status(200).send(counterparts);
};
