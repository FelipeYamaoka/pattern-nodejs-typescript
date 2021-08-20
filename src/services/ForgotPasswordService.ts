import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import AppError from '../errors/AppError';
import User from '../models/User';

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

    // await usersRepository.findByIdAndUpdate(checkUserExists.id, {

    // })
  }
}

export default ForgotPasswordService;
