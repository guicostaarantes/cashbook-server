import { IAccountsRepository, ICreateAccountDTO } from './IAccountsRepository';
import FakeAccount from '../entities/FakeAccount';

class FakeAccountsRepository implements IAccountsRepository {
  public table: FakeAccount[];

  constructor() {
    this.table = [];
  }

  public async create({ name }: ICreateAccountDTO): Promise<FakeAccount> {
    const account = new FakeAccount();

    account.name = name;

    this.table.push(account);

    return account;
  }

  public async update(account: FakeAccount): Promise<FakeAccount> {
    const accountIndex = this.table.findIndex(
      findAccount => findAccount.id === account.id,
    );

    this.table[accountIndex] = account;

    return account;
  }

  public async find(
    page: number,
    fields: (keyof FakeAccount)[],
  ): Promise<FakeAccount[]> {
    const accounts = this.table.slice(10 * (page - 1), 10);
    const response = accounts.map(account => {
      if (fields.length) {
        Object.keys(account)
          .filter(key => !fields.includes(key as keyof FakeAccount))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete account[key as keyof FakeAccount]);
      }
      return account;
    });
    return response;
  }

  public async findById(
    id: string,
    fields: (keyof FakeAccount)[],
  ): Promise<FakeAccount> {
    const account = this.table.find(findAccount => findAccount.id === id);
    if (!account) {
      return undefined;
    }
    const response = { ...account };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeAccount))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeAccount]);
    }
    return response;
  }

  public async findByName(
    name: string,
    fields: (keyof FakeAccount)[],
  ): Promise<FakeAccount> {
    const account = this.table.find(findAccount => findAccount.name === name);
    if (!account) {
      return undefined;
    }
    const response = { ...account };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeAccount))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeAccount]);
    }
    return response;
  }
}

export default FakeAccountsRepository;
