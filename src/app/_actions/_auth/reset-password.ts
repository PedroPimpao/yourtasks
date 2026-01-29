"use server";

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

interface ResetPasswordProps {
  token: string | null
  newPassword: string;
  confirmNewPassword: string
}

export const resetPassword = async ({ token, newPassword, confirmNewPassword }: ResetPasswordProps) => {
  if (!token) {
    return {
      success: false,
      errorMessage: "Token é necessário",
    };
  }

  if (!newPassword || newPassword.length === 0) {
    return {
      success: false,
      errorMessage: `Nova senha é necessária`,
    };
  }

  if(newPassword !== confirmNewPassword){
    return {
      success: false,
      errorMessage: 'As senhas não coincidem'
    }
  }
  try {
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },

      headers: await headers(),
    });
    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`[ERRO] Erro ao redefinir a senha: ${e.message}`);
    return {
      success: false,
      errorMessage: `[ERRO] Erro ao redefinir a senha`,
    };
  }
};
