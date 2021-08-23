import { Router } from 'express';

import ResetPasswordService from '../services/ResetPasswordService';

const resetPasswordRouter = Router();

resetPasswordRouter.post('/', async (request, response) => {
  const { email, password_reset_token, password } = request.body;

  const resetPassword = new ResetPasswordService();

  const user = await resetPassword.execute({
    email,
    password_reset_token,
    password,
  });

  delete user.password;

  return response.json({ user, password_reset_token });
});

export default resetPasswordRouter;
