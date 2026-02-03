import { authClient } from "@/src/lib/auth-client";

interface SignUpClientProps {
  name: string;
  email: string;
  password: string;
}

export const signUpClient = async ({
  name,
  email,
  password,
}: SignUpClientProps) => {
  let success = false;
  let message = "";
  let userExists = false;
  await authClient.signUp.email(
    {
      name,
      email,
      password,
      callbackURL: "/login",
    },
    {
      onSuccess: () => {
        success = true;
        message =
          "Cadastro realizado com sucesso! Por favor, verifique seu email";
        console.log(message);
      },
      onError: (ctx) => {
        success = false;
        message = "Erro ao cadastrar";
        console.log(`${message}: ${ctx.error.message}`);
        if (ctx.error.status === 422) {
          message = "Email já cadastrado";
          userExists = true;
        }
      },
    },
  );
  return {
    success,
    message,
    userExists,
  };
};
