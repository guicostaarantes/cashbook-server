import IAccount from '../../entities/accounts/IAccount';

export interface ICreateAccountDTO {
  name: string;
}

export interface IAccountsRepository {
  create(dto: ICreateAccountDTO): Promise<IAccount>;
  update(Account: IAccount): Promise<IAccount>;
  find(page: number, fields: (keyof IAccount)[]): Promise<IAccount[]>;
  findById(id: string, fields: (keyof IAccount)[]): Promise<IAccount>;
  findByName(id: string, fields: (keyof IAccount)[]): Promise<IAccount>;
}
