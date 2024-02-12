import { z } from "zod";

export const schema = z.object({
  name: z
    .string({
      required_error: "User name is obligated",
    })
    .min(4, "User name is too short"),
  email: z
    .string({
      required_error: "Email is obligated",
    })
    .email("Enter a valid email")
    .min(11, "Email is too short"),
  password: z
    .string({
      required_error: "Password is obligated",
    })
    .min(8, "Passorword is too short"),
  confirmPassword: z
    .string({
      required_error: "Password confirmation is obligated",
    })
    .min(8, "Passwords doesn't match"),
});

export type FieldValuesSignupLogin = z.infer<typeof schema>;