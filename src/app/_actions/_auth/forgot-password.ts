"use server";

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

interface ForgotPasswordProps {
  userEmail: string;
}

export const forgotPassword = async ({ userEmail }: ForgotPasswordProps) => {
  try {
    if (!userEmail || userEmail.length === 0) {
      return {
        success: false,
        errorMessage: "Email é necessário",
      };
    }

    await auth.api.requestPasswordReset({
      body: {
        email: userEmail,
        redirectTo: `${process.env.APP_URL_PROD}/reset-password`,
      },
      headers: await headers(),
    });

    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`Erro ao solicitar redefinição de senha: ${e.message}`);
    return {
      success: false,
      errorMessage: `[ERRO] Erro ao solicitar redefinição de senha`,
    };
  }
};
