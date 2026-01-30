import { authClient } from "@/src/lib/auth-client";

interface DeleteUserProps {
  password: string;
}

export const deleteUser = async ({ password }: DeleteUserProps) => {
  let success = false;
  let message = "";
  let is403Error = false;
  await authClient.deleteUser(
    {
      password,
      callbackURL: "/login",
    },
    {
      onSuccess: () => {
        success = true;
        message = "Conta excluída com sucesso!";
        console.log(message);
        // redirect("/");
      },
      onError: (ctx) => {
        success = false;
        message = "Erro ao excluir a conta";
        console.log(`${message}: ${ctx.error.message}`);
        if (ctx.error.status === 403) {
          message = "Email não verificado";
          is403Error = true;
          // alert(message);
        }
        if (ctx.error.status === 401) {
          message = "Senha incorreta";
          // alert(message);
        }
      },
    },
  );
  return { success, message, is403Error };
};
