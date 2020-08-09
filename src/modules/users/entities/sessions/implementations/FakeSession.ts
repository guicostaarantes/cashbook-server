import ISession from '../ISession';

class FakeSession implements ISession {
  id: string;

  userId: string;

  fingerprint: string;

  expiresAt: Date;
}

export default FakeSession;
