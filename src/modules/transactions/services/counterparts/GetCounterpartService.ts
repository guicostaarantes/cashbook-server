import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICounterpart from '../../entities/counterparts/ICounterpart';
import { ICounterpartsRepository } from '../../repositories/counterparts/ICounterpartsRepository';

interface IServiceRequest {
  id: string;
  fields: (keyof ICounterpart)[];
}

@injectable()
class GetCounterpartService {
  constructor(
    @inject('CounterpartsRepository')
    private counterpartsRepository: ICounterpartsRepository,
  ) {}

  public async execute({ id, fields }: IServiceRequest): Promise<ICounterpart> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const counterpart = await this.counterpartsRepository.findById(id, fields);

    if (!counterpart) {
      throw new AppError('Counterpart not found.', 404);
    }

    return counterpart;
  }
}

export default GetCounterpartService;
