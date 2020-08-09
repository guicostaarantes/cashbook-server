import {
  ITransactionsRepository,
  ICreateTransactionDTO,
} from '../ITransactionsRepository';
import FakeTransaction from '../../../entities/transactions/implementations/FakeTransaction';

class FakeTransactionsRepository implements ITransactionsRepository {
  public table: FakeTransaction[];

  constructor() {
    this.table = [];
  }

  public async create({
    accountId,
    categoryId,
    counterpartId,
    description,
    status,
    value,
    referenceDate,
  }: ICreateTransactionDTO): Promise<FakeTransaction> {
    const transaction = new FakeTransaction();

    transaction.accountId = accountId;
    transaction.categoryId = categoryId;
    transaction.counterpartId = counterpartId;
    transaction.description = description;
    transaction.status = status;
    transaction.value = value;
    transaction.referenceDate = referenceDate;

    this.table.push(transaction);

    return transaction;
  }

  public async update(transaction: FakeTransaction): Promise<FakeTransaction> {
    const transactionIndex = this.table.findIndex(
      findTransaction => findTransaction.id === transaction.id,
    );

    this.table[transactionIndex] = transaction;

    return transaction;
  }

  public async delete(transaction: FakeTransaction): Promise<void> {
    const transactionIndex = this.table.findIndex(
      findTransaction => findTransaction.id === transaction.id,
    );

    this.table.splice(transactionIndex, 1);
  }

  public async find(
    page: number,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction[]> {
    const transactions = this.table.slice(10 * (page - 1), 10);
    const response = transactions.map(transaction => {
      if (fields.length) {
        Object.keys(transaction)
          .filter(key => !fields.includes(key as keyof FakeTransaction))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete transaction[key as keyof FakeTransaction]);
      }
      return transaction;
    });
    return response;
  }

  public async findById(
    id: string,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction> {
    const transaction = this.table.find(
      findTransaction => findTransaction.id === id,
    );
    if (!transaction) {
      return undefined;
    }
    const response = { ...transaction };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeTransaction))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeTransaction]);
    }
    return response;
  }

  public async findByAccountId(
    accountId: string,
    page: number,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction[]> {
    const transactions = this.table
      .filter(findTransaction => findTransaction.accountId === accountId)
      .slice(10 * (page - 1), 10);
    const response = transactions.map(transaction => {
      if (fields.length) {
        Object.keys(transaction)
          .filter(key => !fields.includes(key as keyof FakeTransaction))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete transaction[key as keyof FakeTransaction]);
      }
      return transaction;
    });
    return response;
  }

  public async findByCategoryId(
    categoryId: string,
    page: number,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction[]> {
    const transactions = this.table
      .filter(findTransaction => findTransaction.categoryId === categoryId)
      .slice(10 * (page - 1), 10);
    const response = transactions.map(transaction => {
      if (fields.length) {
        Object.keys(transaction)
          .filter(key => !fields.includes(key as keyof FakeTransaction))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete transaction[key as keyof FakeTransaction]);
      }
      return transaction;
    });
    return response;
  }

  public async findByCounterpartId(
    counterpartId: string,
    page: number,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction[]> {
    const transactions = this.table
      .filter(
        findTransaction => findTransaction.counterpartId === counterpartId,
      )
      .slice(10 * (page - 1), 10);
    const response = transactions.map(transaction => {
      if (fields.length) {
        Object.keys(transaction)
          .filter(key => !fields.includes(key as keyof FakeTransaction))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete transaction[key as keyof FakeTransaction]);
      }
      return transaction;
    });
    return response;
  }

  public async findByReferencePeriod(
    startDate: Date,
    endDate: Date,
    page: number,
    fields: (keyof FakeTransaction)[],
  ): Promise<FakeTransaction[]> {
    const transactions = this.table
      .filter(
        findTransaction =>
          findTransaction.referenceDate >= startDate &&
          findTransaction.referenceDate <= endDate,
      )
      .slice(10 * (page - 1), 10);
    const response = transactions.map(transaction => {
      if (fields.length) {
        Object.keys(transaction)
          .filter(key => !fields.includes(key as keyof FakeTransaction))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete transaction[key as keyof FakeTransaction]);
      }
      return transaction;
    });
    return response;
  }
}

export default FakeTransactionsRepository;
