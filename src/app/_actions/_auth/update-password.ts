"use server";

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { getServerSession } from "./get-server-session";

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
    const session = await getServerSession()

    if (!session?.user) {
      return {
        success: false,
        message: `Usuário não autenticado`,
      };
    }

    if (newPassword !== confirmNewPassword) {
      return {
        success: false,
        message: "As senhas não coincidem",
      };
    }

    await auth.api.changePassword({
      body: {
        currentPassword: currentPassword,
        newPassword: newPassword,
        revokeOtherSessions: false,
      },
      headers: await headers(),
    });

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
