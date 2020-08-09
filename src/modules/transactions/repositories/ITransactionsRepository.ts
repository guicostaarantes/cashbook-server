import ITransaction from '../entities/ITransaction';
import EStatus from '../entities/EStatus';

export interface ICreateTransactionDTO {
  accountId: string;
  categoryId: string;
  counterpartId: string;
  status: EStatus;
  description: string;
  value: number;
  referenceDate: Date;
}

export interface ITransactionsRepository {
  create(dto: ICreateTransactionDTO): Promise<ITransaction>;
  update(Transaction: ITransaction): Promise<ITransaction>;
  delete(Transaction: ITransaction): Promise<void>;
  find(page: number, fields: (keyof ITransaction)[]): Promise<ITransaction[]>;
  findById(id: string, fields: (keyof ITransaction)[]): Promise<ITransaction>;
  findByAccountId(
    accountId: string,
    page: number,
    fields: (keyof ITransaction)[],
  ): Promise<ITransaction[]>;
  findByCategoryId(
    categoryId: string,
    page: number,
    fields: (keyof ITransaction)[],
  ): Promise<ITransaction[]>;
  findByCounterpartId(
    counterpartId: string,
    page: number,
    fields: (keyof ITransaction)[],
  ): Promise<ITransaction[]>;
  findByReferencePeriod(
    startDate: Date,
    endDate: Date,
    page: number,
    fields: (keyof ITransaction)[],
  ): Promise<ITransaction[]>;
}
