import { z } from 'zod';

const createArticleSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  body: z.string({ required_error: 'Body is required' }),
  tagList: z.array(z.string()).optional(),
});

type CreateArticleDto = z.infer<typeof createArticleSchema>;

export { createArticleSchema, type CreateArticleDto };
