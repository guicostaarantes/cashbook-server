import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICounterpart from '../entities/ICounterpart';
import { ICounterpartsRepository } from '../repositories/ICounterpartsRepository';

interface IServiceRequest {
  counterpartId: string;
  name?: string;
}

@injectable()
class UpdateCounterpartService {
  constructor(
    @inject('CounterpartsRepository')
    private counterpartsRepository: ICounterpartsRepository,
  ) {}

  public async execute({
    counterpartId,
    ...changingFields
  }: IServiceRequest): Promise<ICounterpart> {
    const counterpart = await this.counterpartsRepository.findById(
      counterpartId,
      [],
    );

    const validFields = Object.keys(changingFields).every(field =>
      ['name'].includes(field),
    );

    if (!validFields) {
      throw new AppError('Bad request', 400);
    }

    const { name } = changingFields;

    const findByName =
      name && (await this.counterpartsRepository.findByName(name, ['id']));

    if (findByName && findByName.id !== counterpartId) {
      throw new AppError(
        'There is another counterpart with the same name.',
        400,
      );
    }

    const newCounterpart = { ...counterpart, ...changingFields };

    await this.counterpartsRepository.update(newCounterpart);

    return newCounterpart;
  }
}

export default UpdateCounterpartService;
