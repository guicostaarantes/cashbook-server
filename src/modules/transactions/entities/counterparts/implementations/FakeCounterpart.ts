import ICounterpart from '../ICounterpart';

class FakeCounterpart implements ICounterpart {
  id: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeCounterpart;
