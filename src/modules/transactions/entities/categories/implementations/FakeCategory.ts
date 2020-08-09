import ICategory from '../ICategory';

class FakeCategory implements ICategory {
  id: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeCategory;
