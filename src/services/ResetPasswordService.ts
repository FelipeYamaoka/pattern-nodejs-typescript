import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  email: string;
  password_reset_token: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password_reset_token, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (!checkUserExists) {
      throw new AppError('O e-mail não é válido para esse código.');
    }


    if (checkUserExists.password_reset_token !== password_reset_token) {
      throw new AppError('O código não é válido para esse e-mail.');
    } else {

      const hashedPassword = await hash(password, 8);

      const user = await usersRepository.save({
        id: checkUserExists.id,
        name: checkUserExists.name,
        password: hashedPassword,
        email,
        password_reset_token: password_reset_token,
        password_reset_expires: checkUserExists.password_reset_expires,
      });

      return user;
    }
  }
}

export default AuthenticateUserService;
