import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../shared/infra/http/middleware/ensureAuthenticated';
import postSession from './middleware/postSession';
import delSession from './middleware/delSession';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      fingerprint: Joi.string().uuid().required(),
    },
  }),
  postSession,
);

sessionsRouter.delete('/', ensureAuthenticated, delSession);

export default sessionsRouter;
