import { container } from 'tsyringe';

import { IHashProvider } from '../providers/HashProvider/IHashProvider';
import { IStorageProvider } from '../providers/StorageProvider/IStorageProvider';
import { IMailProvider } from '../providers/MailProvider/IMailProvider';
import { ITokenProvider } from '../providers/TokenProvider/ITokenProvider';
import { ITemplateProvider } from '../providers/TemplateProvider/ITemplateProvider';

import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';
import JWTokenProvider from '../providers/TokenProvider/implementations/JWTokenProvider';
import HandlebarsTemplateProvider from '../providers/TemplateProvider/implementations/HandlebarsTemplateProvider';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IAccountsRepository } from '../../modules/transactions/repositories/accounts/IAccountsRepository';
import { ICounterpartsRepository } from '../../modules/transactions/repositories/counterparts/ICounterpartsRepository';
import { ICategoriesRepository } from '../../modules/transactions/repositories/categories/ICategoriesRepository';
import { ITransactionsRepository } from '../../modules/transactions/repositories/transactions/ITransactionsRepository';

import PGUsersRepository from '../../modules/users/repositories/implementations/UsersRepository';
import PGAccountsRepository from '../../modules/transactions/repositories/accounts/implementations/PGAccountsRepository';
import PGCounterpartsRepository from '../../modules/transactions/repositories/counterparts/implementations/PGCounterpartsRepository';
import PGCategoriesRepository from '../../modules/transactions/repositories/categories/implementations/PGCategoriesRepository';
import PGTransactionsRepository from '../../modules/transactions/repositories/transactions/implementations/PGTransactionsRepository';

// Providers

container.registerInstance<IHashProvider>(
  'HashProvider',
  new BCryptHashProvider(),
);
container.registerInstance<IStorageProvider>(
  'StorageProvider',
  new DiskStorageProvider(),
);
container.registerInstance<ITemplateProvider>(
  'TemplateProvider',
  new HandlebarsTemplateProvider(),
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
container.registerInstance<ITokenProvider>(
  'TokenProvider',
  new JWTokenProvider(),
);

// Repositories

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PGUsersRepository,
);
container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  PGAccountsRepository,
);
container.registerSingleton<ICounterpartsRepository>(
  'CounterpartsRepository',
  PGCounterpartsRepository,
);
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  PGCategoriesRepository,
);
container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  PGTransactionsRepository,
);
