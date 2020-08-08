import ICounterpart from '../entities/ICounterpart';

export interface ICreateCounterpartDTO {
  name: string;
}

export interface ICounterpartsRepository {
  create(dto: ICreateCounterpartDTO): Promise<ICounterpart>;
  update(Counterpart: ICounterpart): Promise<ICounterpart>;
  find(page: number, fields: (keyof ICounterpart)[]): Promise<ICounterpart[]>;
  findById(id: string, fields: (keyof ICounterpart)[]): Promise<ICounterpart>;
  findByName(id: string, fields: (keyof ICounterpart)[]): Promise<ICounterpart>;
}
