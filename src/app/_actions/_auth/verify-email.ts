"use server";

import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";

export const verifyEmail = async (email: string) => {
  await authClient.sendVerificationEmail(
    {
      email,
      callbackURL: "/",
    },
    {
      onSuccess: () => {
        redirect("/");
      },
      onError: (ctx) => {
        console.log(`Erro ao enviar email: ${ctx.error.message}`)
      },
    },
  );
};
