import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getCounterparts from './middleware/getCounterparts';
import getCounterpart from './middleware/getCounterpart';
import getTransactionsOfCounterpart from './middleware/getTransactionsOfCounterpart';
import postCounterpart from './middleware/postCounterpart';
import patchCounterpart from './middleware/patchCounterpart';

const counterpartsRouter = Router();

counterpartsRouter.get('/', ensureAuthenticated, getCounterparts);

counterpartsRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getCounterpart,
);

counterpartsRouter.get(
  '/:id/transactions',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getTransactionsOfCounterpart,
);

counterpartsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  postCounterpart,
);

counterpartsRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  patchCounterpart,
);

export default counterpartsRouter;
