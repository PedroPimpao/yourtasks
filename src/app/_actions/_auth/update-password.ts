"use server";

import { authClient } from "@/src/lib/auth-client";

interface UpdatePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const updatePassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: UpdatePasswordProps) => {
  try {
    if (newPassword === confirmNewPassword) {
      await authClient.changePassword({
        currentPassword,
        newPassword,
      });
    } else {
      console.log("As senhas não coincidem");
    }
    return {
      success: true,
      message: "Senha atualizada com sucesso!",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: `Erro ao atualizar a senha`,
      errorMessage: `[ERRO]: ${e.message}`,
    };
  }
};
