import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";

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
  await authClient.signUp.email(
    {
      name,
      email,
      password,
      callbackURL: "/",
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
