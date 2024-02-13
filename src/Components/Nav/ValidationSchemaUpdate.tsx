import { z } from 'zod';

export const schema = z.object({
  name: z.string().optional(),
  email: z.string().email("Enter a valid email").optional(),
  oldPassword: z.string().min(8, 'Please enter you password'),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type FieldValuesUpdateUser = z.infer<typeof schema>