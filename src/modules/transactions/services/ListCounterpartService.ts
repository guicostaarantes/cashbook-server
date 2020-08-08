import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICounterpart from '../entities/ICounterpart';
import { ICounterpartsRepository } from '../repositories/ICounterpartsRepository';

interface IServiceRequest {
  page: number;
  fields: (keyof ICounterpart)[];
}

@injectable()
class ListCounterpartService {
  constructor(
    @inject('CounterpartsRepository')
    private counterpartsRepository: ICounterpartsRepository,
  ) {}

  public async execute({
    page,
    fields,
  }: IServiceRequest): Promise<ICounterpart[]> {
    const validFields = fields.every(field => ['id', 'name'].includes(field));

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const counterparts = await this.counterpartsRepository.find(page, fields);

    if (!counterparts.length) {
      throw new AppError('No counterparts found.', 404);
    }

    return counterparts;
  }
}

export default ListCounterpartService;
