import { getRepository } from 'typeorm';
import crypto from 'crypto';

import AppError from '../errors/AppError';
import User from '../models/User';
import transport from '../modules/mailer';


interface Request {
  email: string;
}

class ForgotPasswordService {
  public async execute({ email }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (!checkUserExists) {
      throw new AppError('Email does not exist, verify if you have typing correctly.');
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const user = await usersRepository.save({
      id: checkUserExists.id,
      name: checkUserExists.name,
      password: checkUserExists.password,
      email,
      password_reset_token: token,
      password_reset_expires: now,
    });

    console.log(token, now);
    console.log("O QUE TEM: ", user);

    delete user.password;

    await transport.sendMail({
      from: 'feh_yamaoka@outlook.com',
      to: email,
      subject: 'Email com nodemailer',
      text: 'Este é um email de teste',
      html: `<p>Olá ${user.name},</p></br>
      <p>Segue abaixo o código de autenticação para recuperar o seu acesso</p></br>
      <p>${token}</p>`
    });

    return user;
  }
}

export default ForgotPasswordService;
