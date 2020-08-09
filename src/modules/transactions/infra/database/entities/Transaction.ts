import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ITransaction from '../../../entities/ITransaction';
import EStatus from '../../../entities/EStatus';

import Account from './Account';
import Category from './Category';
import Counterpart from './Counterpart';

@Entity('transactions')
class Transaction implements ITransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'account_id' })
  accountId: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'counterpart_id' })
  counterpartId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: Promise<Account>;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Promise<Category>;

  @ManyToOne(() => Counterpart)
  @JoinColumn({ name: 'counterpart_id', referencedColumnName: 'id' })
  counterpart: Promise<Counterpart>;

  @Column({
    type: 'enum',
    enum: EStatus,
  })
  status: EStatus;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column({ name: 'reference_date' })
  referenceDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Transaction;
