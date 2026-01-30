import { authClient } from "@/src/lib/auth-client";

interface ChangeEmailProps {
  newEmail: string;
}

export const changeEmail = async ({ newEmail }: ChangeEmailProps) => {
  let success = false;
  let message = "";

  if (!newEmail) {
    return {
      success: false,
      message: "Email é necessário",
    };
  }

  await authClient.changeEmail(
    {
      newEmail,
      callbackURL: "/login",
    },
    {
      onSuccess: () => {
        success = true;
        message =
          "Confirme a alteração clicando no link na caixa de correio do email atual";
        console.log(message);
      },
      onError: () => {
        success = false;
        message = "Erro na alteração de email";
        console.log(message);
      },
    },
  );

  return { success, message };
};
