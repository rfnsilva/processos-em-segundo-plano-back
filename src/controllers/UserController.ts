import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';

import fila_email from '../lib/Fila'

//registra usuario
export const register = async(req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
  
    const user = await getRepository(User).save({
      nome,
      email,
      senha
    });

    await fila_email.add('EmailRegister', { user });
     
    return res.json(user);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao registrar user' })
  }
}