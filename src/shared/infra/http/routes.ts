import { Router } from 'express';

import accountsRouter from '../../../modules/accounts/infra/http/routes/accounts';
import sessionsRouter from '../../../modules/users/infra/http/routes/sessions';
import usersRouter from '../../../modules/users/infra/http/routes/users';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
