import {
  ICounterpartsRepository,
  ICreateCounterpartDTO,
} from '../ICounterpartsRepository';
import FakeCounterpart from '../../../entities/counterparts/implementations/FakeCounterpart';

class FakeCounterpartsRepository implements ICounterpartsRepository {
  public table: FakeCounterpart[];

  constructor() {
    this.table = [];
  }

  public async create({
    name,
  }: ICreateCounterpartDTO): Promise<FakeCounterpart> {
    const counterpart = new FakeCounterpart();

    counterpart.name = name;

    this.table.push(counterpart);

    return counterpart;
  }

  public async update(counterpart: FakeCounterpart): Promise<FakeCounterpart> {
    const counterpartIndex = this.table.findIndex(
      findCounterpart => findCounterpart.id === counterpart.id,
    );

    this.table[counterpartIndex] = counterpart;

    return counterpart;
  }

  public async find(
    page: number,
    fields: (keyof FakeCounterpart)[],
  ): Promise<FakeCounterpart[]> {
    const counterparts = this.table.slice(10 * (page - 1), 10);
    const response = counterparts.map(counterpart => {
      if (fields.length) {
        Object.keys(counterpart)
          .filter(key => !fields.includes(key as keyof FakeCounterpart))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete counterpart[key as keyof FakeCounterpart]);
      }
      return counterpart;
    });
    return response;
  }

  public async findById(
    id: string,
    fields: (keyof FakeCounterpart)[],
  ): Promise<FakeCounterpart> {
    const counterpart = this.table.find(
      findCounterpart => findCounterpart.id === id,
    );
    if (!counterpart) {
      return undefined;
    }
    const response = { ...counterpart };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeCounterpart))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeCounterpart]);
    }
    return response;
  }

  public async findByName(
    name: string,
    fields: (keyof FakeCounterpart)[],
  ): Promise<FakeCounterpart> {
    const counterpart = this.table.find(
      findCounterpart => findCounterpart.name === name,
    );
    if (!counterpart) {
      return undefined;
    }
    const response = { ...counterpart };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeCounterpart))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeCounterpart]);
    }
    return response;
  }
}

export default FakeCounterpartsRepository;
