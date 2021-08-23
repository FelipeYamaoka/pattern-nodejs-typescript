import { Router } from 'express';

import ForgotPasswordService from '../services/ForgotPasswordService';


const forgotPass = Router();

forgotPass.post('/', async (request, response) => {
  const { email } = request.body;

  const userEmailPass = new ForgotPasswordService();

  const passwordRecovery = await userEmailPass.execute({
    email,
  });

  return response.json(passwordRecovery);
});

export default forgotPass;
