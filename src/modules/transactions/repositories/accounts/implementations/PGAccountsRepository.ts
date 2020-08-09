import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import { IAccountsRepository, ICreateAccountDTO } from '../IAccountsRepository';
import Account from '../../../entities/accounts/implementations/PGAccount';

class AccountsRepository implements IAccountsRepository {
  baseRepository: Repository<Account>;

  constructor() {
    this.baseRepository = getRepository(Account);
  }

  public async create({ name }: ICreateAccountDTO): Promise<Account> {
    const newAccount = this.baseRepository.create({
      name,
    });

    const account = await this.baseRepository.save(newAccount);

    return account;
  }

  public async update(account: Account): Promise<Account> {
    await this.baseRepository.save(account);
    return account;
  }

  public async find(
    page: number,
    fields: (keyof Account)[],
  ): Promise<Account[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const accounts = await this.baseRepository.find(options);
    return accounts;
  }

  public async findById(
    id: string,
    fields: (keyof Account)[],
  ): Promise<Account> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const account = await this.baseRepository.findOne(options);
    return account;
  }

  public async findByName(
    name: string,
    fields: (keyof Account)[],
  ): Promise<Account> {
    const options = {
      where: { name },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const account = await this.baseRepository.findOne(options);
    return account;
  }
}

export default AccountsRepository;
