"use server";

import { db } from "@/src/lib/prisma";
import { getServerSession } from "./get-server-session";

interface UpdateUserNameProps {
  userID: string;
  newUsername: string;
}

export const updateUserName = async ({
  userID,
  newUsername,
}: UpdateUserNameProps) => {
  try {
    const data = await getServerSession();

    if (!userID || userID.length === 0) {
      return {
        success: false,
        errorMessage: `ID do usuário é obigatório`,
      };
    }

    if (!newUsername || newUsername.length === 0) {
      return {
        success: false,
        errorMessage: `Insira o novo nome de usuário`,
      };
    }

    if (!data?.user) {
      return {
        success: false,
        errorMessage: `Usuário não autenticado`,
      };
    }

    await db.user.update({
      where: {
        id: userID,
      },
      data: {
        name: newUsername,
      },
    });

    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`[ERRO] Erro ao alterar nome de usuário: ${e.message}`);
    return {
      success: false,
      errorMessage: `[ERRO] Erro ao alterar nome de usuário`,
    };
  }
};
