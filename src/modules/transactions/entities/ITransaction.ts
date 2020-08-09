import IAccount from './IAccount';
import ICounterpart from './ICounterpart';
import ICategory from './ICategory';
import EStatus from './EStatus';

export default interface ITransaction {
  id: string;
  accountId: string;
  categoryId: string;
  counterpartId: string;
  account?: Promise<IAccount>;
  category?: Promise<ICategory>;
  counterpart?: Promise<ICounterpart>;
  status: EStatus;
  description: string;
  value: number;
  referenceDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
