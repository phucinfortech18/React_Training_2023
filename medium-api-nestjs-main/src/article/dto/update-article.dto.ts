import { z } from 'zod';
import { createArticleSchema } from './create-article.dto';

const updateArticleSchema = createArticleSchema.partial();

type UpdateArticleDto = z.infer<typeof updateArticleSchema>;

export { updateArticleSchema, type UpdateArticleDto };
