import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import forgotPass from './forgotPass.routes';
import resetPasswordRouter from './resetPassword.routes'

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/forgot_password', forgotPass);
routes.use('/reset_password', resetPasswordRouter);

export default routes;
