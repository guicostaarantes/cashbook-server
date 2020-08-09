export default interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
