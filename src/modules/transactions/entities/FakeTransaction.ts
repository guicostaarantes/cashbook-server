import FakeAccount from './FakeAccount';
import FakeCounterpart from './FakeCounterpart';
import FakeCategory from './FakeCategory';

import ITransaction from './ITransaction';
import EStatus from './EStatus';

class FakeTransaction implements ITransaction {
  id: string;

  accountId: string;

  categoryId: string;

  counterpartId: string;

  account?: Promise<FakeAccount>;

  category?: Promise<FakeCategory>;

  counterpart?: Promise<FakeCounterpart>;

  status: EStatus;

  description: string;

  value: number;

  referenceDate: Date;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeTransaction;
