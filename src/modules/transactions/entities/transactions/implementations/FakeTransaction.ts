import FakeAccount from '../../accounts/implementations/FakeAccount';
import FakeCounterpart from '../../counterparts/implementations/FakeCounterpart';
import FakeCategory from '../../categories/implementations/FakeCategory';

import ITransaction from '../ITransaction';
import EStatus from '../EStatus';

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
