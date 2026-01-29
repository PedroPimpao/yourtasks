import { authClient } from "@/src/lib/auth-client";
// import { redirect } from "next/navigation";

interface SignInClientProps {
  email: string;
  password: string;
}

export const signInClient = async ({ email, password }: SignInClientProps) => {
  let success = false
  let message = ''
  let is403Error = false
  await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: "/",
      rememberMe: true,
    },
    {
      onSuccess: () => {
        success = true
        message = 'Conectado com sucesso!'
        console.log(message)
        // redirect("/");
      },
      onError: (ctx) => {
        success = false
        message = 'Erro ao conectar'
        console.log(`${message}: ${ctx.error.message}`);
        if (ctx.error.status === 403) {
          message = "Email não verificado"
          is403Error = true
          // alert(message);
        }
        if(ctx.error.status === 401) {
          message = "Email ou senha incorretos"
          // alert(message);
        }
      },
  
    },
  );
  return { success, message, is403Error }
};
