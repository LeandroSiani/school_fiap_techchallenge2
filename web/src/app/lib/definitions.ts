import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Usuario tem mais de 2 caracteres" }).trim(),
  password: z
    .string()
    .min(8, { message: "Senha tem pelo menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Contém pelo menos uma letra." })
    .regex(/[0-9]/, { message: "Contém pelo menos um numero." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contém pelo menos um caracter especial.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
