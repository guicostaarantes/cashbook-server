import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import {
  ITransactionsRepository,
  ICreateTransactionDTO,
} from '../ITransactionsRepository';
import Transaction from '../../../entities/transactions/implementations/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  baseRepository: Repository<Transaction>;

  constructor() {
    this.baseRepository = getRepository(Transaction);
  }

  public async create({
    accountId,
    categoryId,
    counterpartId,
    description,
    status,
    value,
    referenceDate,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const newTransaction = this.baseRepository.create({
      accountId,
      categoryId,
      counterpartId,
      description,
      status,
      value,
      referenceDate,
    });

    const transaction = await this.baseRepository.save(newTransaction);

    return transaction;
  }

  public async update(transaction: Transaction): Promise<Transaction> {
    await this.baseRepository.save(transaction);
    return transaction;
  }

  public async delete(transaction: Transaction): Promise<void> {
    await this.baseRepository.softRemove(transaction);
  }

  public async find(
    page: number,
    fields: (keyof Transaction)[],
  ): Promise<Transaction[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const transactions = await this.baseRepository.find(options);

    if (fields.includes('account'))
      await Promise.all(transactions.map(transaction => transaction.account));
    if (fields.includes('category'))
      await Promise.all(transactions.map(transaction => transaction.category));
    if (fields.includes('counterpart'))
      await Promise.all(
        transactions.map(transaction => transaction.counterpart),
      );

    return transactions;
  }

  public async findById(
    id: string,
    fields: (keyof Transaction)[],
  ): Promise<Transaction> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const transaction = await this.baseRepository.findOne(options);

    if (fields.includes('account')) await transaction.account;
    if (fields.includes('category')) await transaction.category;
    if (fields.includes('counterpart')) await transaction.counterpart;

    return transaction;
  }

  public async findByAccountId(
    accountId: string,
    page: number,
    fields: (keyof Transaction)[],
  ): Promise<Transaction[]> {
    const options = {
      where: { accountId },
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const transactions = await this.baseRepository.find(options);

    if (fields.includes('account'))
      await Promise.all(transactions.map(transaction => transaction.account));
    if (fields.includes('category'))
      await Promise.all(transactions.map(transaction => transaction.category));
    if (fields.includes('counterpart'))
      await Promise.all(
        transactions.map(transaction => transaction.counterpart),
      );

    return transactions;
  }

  public async findByCategoryId(
    categoryId: string,
    page: number,
    fields: (keyof Transaction)[],
  ): Promise<Transaction[]> {
    const options = {
      where: { categoryId },
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const transactions = await this.baseRepository.find(options);

    if (fields.includes('account'))
      await Promise.all(transactions.map(transaction => transaction.account));
    if (fields.includes('category'))
      await Promise.all(transactions.map(transaction => transaction.category));
    if (fields.includes('counterpart'))
      await Promise.all(
        transactions.map(transaction => transaction.counterpart),
      );

    return transactions;
  }

  public async findByCounterpartId(
    counterpartId: string,
    page: number,
    fields: (keyof Transaction)[],
  ): Promise<Transaction[]> {
    const options = {
      where: { counterpartId },
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const transactions = await this.baseRepository.find(options);

    if (fields.includes('account'))
      await Promise.all(transactions.map(transaction => transaction.account));
    if (fields.includes('category'))
      await Promise.all(transactions.map(transaction => transaction.category));
    if (fields.includes('counterpart'))
      await Promise.all(
        transactions.map(transaction => transaction.counterpart),
      );

    return transactions;
  }

  public async findByReferencePeriod(
    startDate: Date,
    endDate: Date,
    page: number,
    fields: (keyof Transaction)[],
  ): Promise<Transaction[]> {
    const transactions = await this.baseRepository
      .createQueryBuilder()
      .select(fields)
      .where('reference_date >= :startDate AND reference_date <= :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    if (fields.includes('account'))
      await Promise.all(transactions.map(transaction => transaction.account));
    if (fields.includes('category'))
      await Promise.all(transactions.map(transaction => transaction.category));
    if (fields.includes('counterpart'))
      await Promise.all(
        transactions.map(transaction => transaction.counterpart),
      );

    return transactions;
  }
}

export default TransactionsRepository;
