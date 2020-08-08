import { Router } from 'express';

import accountsRouter from '../../../modules/transactions/infra/http/routes/accounts';
import counterpartsRouter from '../../../modules/transactions/infra/http/routes/counterparts';
import sessionsRouter from '../../../modules/users/infra/http/routes/sessions';
import usersRouter from '../../../modules/users/infra/http/routes/users';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/counterparts', counterpartsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
