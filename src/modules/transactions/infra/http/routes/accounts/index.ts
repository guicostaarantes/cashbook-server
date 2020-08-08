import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getAccounts from './middleware/getAccounts';
import getAccount from './middleware/getAccount';
import postAccount from './middleware/postAccount';
import patchAccount from './middleware/patchAccount';

const accountsRouter = Router();

accountsRouter.get('/', ensureAuthenticated, getAccounts);

accountsRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getAccount,
);

accountsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  postAccount,
);

accountsRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  patchAccount,
);

export default accountsRouter;
