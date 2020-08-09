import { ISessionsRepository, ICreateSessionDTO } from '../ISessionsRepository';
import FakeSession from '../../../entities/sessions/implementations/FakeSession';

class FakeSessionsRepository implements ISessionsRepository {
  public table: FakeSession[];

  constructor() {
    this.table = [];
  }

  public async create({
    userId,
    fingerprint,
  }: ICreateSessionDTO): Promise<FakeSession> {
    const session = new FakeSession();

    session.userId = userId;
    session.fingerprint = fingerprint;

    this.table.push(session);

    return session;
  }

  public async deleteById(id: string): Promise<void> {
    const sessionIndex = this.table.findIndex(
      findSession => findSession.id === id,
    );

    if (sessionIndex !== -1) this.table.splice(sessionIndex, 1);
  }

  public async findById(id: string): Promise<FakeSession> {
    return this.table.find(findSession => findSession.id === id);
  }

  public async findByUserId(userId: string): Promise<FakeSession[]> {
    return this.table.filter(findSession => findSession.userId === userId);
  }
}

export default FakeSessionsRepository;
