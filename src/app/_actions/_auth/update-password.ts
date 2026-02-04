"use server";

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { getServerSession } from "./get-server-session";
import { sendEmail } from "@/src/lib/send-email";
import { UpdatedPasswordConfirmation } from "../../_components/emails/updated-password-confirmation";

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
        errorMessage: `Usuário não autenticado`,
      };
    }

    if (!currentPassword || currentPassword.length === 0) {
      return {
        success: false,
        errorMessage: `Insira a senha atual`,
      };
    }

    if (!newPassword || newPassword.length === 0) {
      return {
        success: false,
        errorMessage: `Insira a nova senha`,
      };
    }

    if (newPassword !== confirmNewPassword) {
      return {
        success: false,
        errorMessage: "As senhas não coincidem",
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

    await sendEmail({
      subject: "Confirmação de redefinição de senha",
      react: UpdatedPasswordConfirmation({ username: session.user.name, email: session.user.email}),
      email: session.user.email
    })

    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`Erro ao atualizar a senha: ${e.message}`);
    return {
      success: false,
      errorMessage: `[ERRO] Erro ao atualizar a senha`,
    };
  }
};
