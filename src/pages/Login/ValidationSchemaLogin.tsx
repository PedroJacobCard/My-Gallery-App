import { z } from "zod";

export const schema = z.object({
    email: z.string().email('enter a valid email').min(11, 'Email is too short'),
  password: z
    .string({
      required_error: "Password is obligated",
    })
    .min(8, "Passorword is too short"),
});

export type FieldValuesLogin = z.infer<typeof schema>;
