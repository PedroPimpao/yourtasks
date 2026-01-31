"use server";

import { authClient } from "@/src/lib/auth-client";

export const verifyEmail = async (email: string) => {
  let success = false;
  let message = "";

  await authClient.sendVerificationEmail(
    {
      email,
      callbackURL: "/",
    },
    {
      onSuccess: () => {
        success = true;
        message = "Email de verificação enviado com sucesso!";
        console.log(message);
      },
      onError: (ctx) => {
        success = false;
        message = "Erro ao enviar email de verificação";
        console.log(`${message}: ${ctx.error.message}`);
      },
    },
  );
  return { success, message };
};
