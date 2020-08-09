import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import getCategories from './middleware/getCategories';
import getCategory from './middleware/getCategory';
import getTransactionsOfCategory from './middleware/getTransactionsOfCategory';
import postCategory from './middleware/postCategory';
import patchCategory from './middleware/patchCategory';

const categoriesRouter = Router();

categoriesRouter.get('/', ensureAuthenticated, getCategories);

categoriesRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getCategory,
);

categoriesRouter.get(
  '/:id/transactions',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getTransactionsOfCategory,
);

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  postCategory,
);

categoriesRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  patchCategory,
);

export default categoriesRouter;
