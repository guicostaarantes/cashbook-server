import IUser from './IUser';

class FakeUser implements IUser {
  id: string;

  fullName: string;

  email: string;

  avatar: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}

export default FakeUser;
