import ISession from '../../entities/sessions/ISession';

export interface ICreateSessionDTO {
  userId: string;
  fingerprint: string;
  expiresAt: Date;
}

export interface ISessionsRepository {
  create(dto: ICreateSessionDTO): Promise<ISession>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<ISession>;
  findByUserId(userId: string): Promise<ISession[]>;
}
