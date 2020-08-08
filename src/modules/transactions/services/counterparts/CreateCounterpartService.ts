import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import ICounterpart from '../../entities/ICounterpart';
import { ICounterpartsRepository } from '../../repositories/ICounterpartsRepository';

interface IServiceRequest {
  name: string;
}

@injectable()
class CreateCounterpartService {
  constructor(
    @inject('CounterpartsRepository')
    private counterpartsRepository: ICounterpartsRepository,
  ) {}

  public async execute({ name }: IServiceRequest): Promise<ICounterpart> {
    const findByName = await this.counterpartsRepository.findByName(name, [
      'id',
    ]);

    if (findByName) {
      throw new AppError(
        'There is another counterpart with the same name.',
        400,
      );
    }

    const counterpart = await this.counterpartsRepository.create({
      name,
    });

    return counterpart;
  }
}

export default CreateCounterpartService;
