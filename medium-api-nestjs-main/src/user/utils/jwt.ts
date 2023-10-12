import { User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export function generateJwt(user: User): string {
  const { email, id, username } = user;
  return sign({ id, username, email }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
}
