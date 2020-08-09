import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import {
  ICounterpartsRepository,
  ICreateCounterpartDTO,
} from '../ICounterpartsRepository';
import Counterpart from '../../../entities/counterparts/implementations/Counterpart';

class CounterpartsRepository implements ICounterpartsRepository {
  baseRepository: Repository<Counterpart>;

  constructor() {
    this.baseRepository = getRepository(Counterpart);
  }

  public async create({ name }: ICreateCounterpartDTO): Promise<Counterpart> {
    const newCounterpart = this.baseRepository.create({
      name,
    });

    const counterpart = await this.baseRepository.save(newCounterpart);

    return counterpart;
  }

  public async update(counterpart: Counterpart): Promise<Counterpart> {
    await this.baseRepository.save(counterpart);
    return counterpart;
  }

  public async find(
    page: number,
    fields: (keyof Counterpart)[],
  ): Promise<Counterpart[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const counterparts = await this.baseRepository.find(options);
    return counterparts;
  }

  public async findById(
    id: string,
    fields: (keyof Counterpart)[],
  ): Promise<Counterpart> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const counterpart = await this.baseRepository.findOne(options);
    return counterpart;
  }

  public async findByName(
    name: string,
    fields: (keyof Counterpart)[],
  ): Promise<Counterpart> {
    const options = {
      where: { name },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const counterpart = await this.baseRepository.findOne(options);
    return counterpart;
  }
}

export default CounterpartsRepository;
