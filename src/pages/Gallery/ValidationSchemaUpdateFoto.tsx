import { z } from "zod";

export const schema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  image_url: z.string().optional(),
});

export type FieldValuesUpdateFoto = z.infer<typeof schema>;
