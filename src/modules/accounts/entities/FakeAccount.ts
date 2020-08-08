import IAccount from './IAccount';

class FakeAccount implements IAccount {
  id: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeAccount;
