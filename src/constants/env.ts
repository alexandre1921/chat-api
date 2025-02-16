import { z } from 'zod';

export const env = z
  .object({
    JWT_SECRET: z.string().default('your_jwt_secret_here'),
  })
  .parse(process.env);
