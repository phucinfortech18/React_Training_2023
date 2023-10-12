import { z } from 'zod';

const createUserSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }),
});

type CreateUserDto = z.infer<typeof createUserSchema>;

export { createUserSchema, type CreateUserDto };
