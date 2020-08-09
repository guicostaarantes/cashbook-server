export default interface ISession {
  id: string;
  userId: string;
  fingerprint: string;
  expiresAt: Date;
}
