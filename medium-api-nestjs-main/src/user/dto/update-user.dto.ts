import { z } from 'zod';

const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
});

type UpdateUserDto = z.infer<typeof updateUserSchema>;

export { updateUserSchema, type UpdateUserDto };
