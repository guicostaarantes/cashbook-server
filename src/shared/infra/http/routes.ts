import { Router } from 'express';

import accountsRouter from '../../../modules/transactions/web/accounts';
import counterpartsRouter from '../../../modules/transactions/web/counterparts';
import categoriesRouter from '../../../modules/transactions/web/categories';
import transactionsRouter from '../../../modules/transactions/web/transactions';
import sessionsRouter from '../../../modules/users/infra/http/routes/sessions';
import usersRouter from '../../../modules/users/infra/http/routes/users';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/counterparts', counterpartsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/transactions', transactionsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
