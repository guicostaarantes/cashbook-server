import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import ISession from '../ISession';

@Entity('sessions')
class Session implements ISession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'fingerprint' })
  fingerprint: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;
}

export default Session;
