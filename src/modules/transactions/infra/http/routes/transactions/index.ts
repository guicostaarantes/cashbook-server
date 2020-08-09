import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getTransactions from './middleware/getTransactions';
import getTransaction from './middleware/getTransaction';
import postTransaction from './middleware/postTransaction';
import patchTransaction from './middleware/patchTransaction';
import delTransaction from './middleware/delTransaction';

const transactionsRouter = Router();

transactionsRouter.get('/', ensureAuthenticated, getTransactions);

transactionsRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getTransaction,
);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      accountId: Joi.string().uuid().required(),
      categoryId: Joi.string().uuid().required(),
      counterpartId: Joi.string().uuid().required(),
      description: Joi.string().required(),
      status: Joi.string().required(),
      value: Joi.number().required(),
      referenceDate: Joi.date().required(),
    },
  }),
  postTransaction,
);

transactionsRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      accountId: Joi.string().uuid(),
      categoryId: Joi.string().uuid(),
      counterpartId: Joi.string().uuid(),
      description: Joi.string(),
      status: Joi.string(),
      value: Joi.number(),
      referenceDate: Joi.date(),
    },
  }),
  patchTransaction,
);

transactionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  delTransaction,
);

export default transactionsRouter;
