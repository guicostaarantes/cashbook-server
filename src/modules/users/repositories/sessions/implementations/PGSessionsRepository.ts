import { Repository, getRepository } from 'typeorm';

import { ISessionsRepository, ICreateSessionDTO } from '../ISessionsRepository';
import Session from '../../../entities/sessions/implementations/PGSession';

class SessionsRepository implements ISessionsRepository {
  baseRepository: Repository<Session>;

  constructor() {
    this.baseRepository = getRepository(Session);
  }

  public async create({
    userId,
    fingerprint,
    expiresAt,
  }: ICreateSessionDTO): Promise<Session> {
    const newSession = this.baseRepository.create({
      userId,
      fingerprint,
      expiresAt,
    });

    const session = await this.baseRepository.save(newSession);

    return session;
  }

  public async deleteById(id: string): Promise<void> {
    await this.baseRepository.delete({ id });
  }

  public async findById(id: string): Promise<Session> {
    const session = await this.baseRepository.findOne({ where: { id } });
    return session;
  }

  public async findByUserId(userId: string): Promise<Session[]> {
    const sessions = await this.baseRepository.find({ where: { userId } });
    return sessions;
  }
}

export default SessionsRepository;
