import { SignupFormSchema } from "../lib/definitions";
import { v4 as uuidv4 } from "uuid";
// Mocked credentials
const MOCKED_CREDENTIALS = {
  name: "admin",
  password: "admin@123",
};

export async function signup(formData: FormData) {
  // Extrair os dados do FormData
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  // Validar os campos do formulário
  const validatedFields = SignupFormSchema.safeParse({
    name,
    password,
  });

  // Se algum campo do formulário for inválido, retornar cedo
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Verificar as credenciais mockadas
  if (name === MOCKED_CREDENTIALS.name && password === MOCKED_CREDENTIALS.password) {
    const token = uuidv4(); // Generate a UUID as the token
    return { success: true, token };
  } else {
    return {
      errors: {
        name: ["Nome de usuário ou senha incorretos"],
        password: ["Nome de usuário ou senha incorretos"],
      },
    };
  }
}
