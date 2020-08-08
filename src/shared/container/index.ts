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
import { IAccountsRepository } from '../../modules/transactions/repositories/IAccountsRepository';

import UsersRepository from '../../modules/users/infra/database/repositories/UsersRepository';
import AccountsRepository from '../../modules/transactions/infra/database/repositories/AccountsRepository';

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
  UsersRepository,
);
container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);
