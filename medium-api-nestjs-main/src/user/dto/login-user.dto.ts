import { z } from 'zod';

const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }),
});

type LoginUserDto = z.infer<typeof loginUserSchema>;

export { loginUserSchema, type LoginUserDto };
