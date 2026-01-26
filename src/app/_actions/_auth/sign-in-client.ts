import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";

interface SignInClientProps {
  email: string;
  password: string;
}

export const signInClient = async ({ email, password }: SignInClientProps) => {
  await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: "/",
      rememberMe: true,
    },
    {
      onSuccess: (ctx) => {
        console.log("Conectado com sucesso!");
        console.log(ctx.data);
        redirect("/");
      },
      onError: (ctx) => {
        console.log(`Erro ao conectar: ${ctx.error.message}`);
        if (ctx.error.status === 403) {
          alert("Por favor, verifique seu endereço de email");
        }
      },
    },
  );
};
