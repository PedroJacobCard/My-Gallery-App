import { z } from 'zod';

export const schema = z.object({
  title: z.string({
    required_error: 'Please enter a title',
  }).min(2, 'Title is too short'),
  category: z.string({
    required_error: 'Please enter a category',
  }).min(2, 'Category is too short'),
  image_url: z.string({
    required_error: 'Please enter a image URL'
  }).min(10, 'URL is too short'),
  userId: z.string({
    required_error: "User ID is required"
  }).min(1, 'ID is too short')
});

export type FieldValuesCreateFoto = z.infer<typeof schema>;