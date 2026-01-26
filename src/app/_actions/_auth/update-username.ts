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

    if (!data?.user.id) {
      throw new Error("Usuário não autenticado");
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
      succsess: true,
      message: "Nome de usuário alterado com sucesso!",
    };
  } catch (error) {
    const e = error as Error;
    console.log(`ERRO ao alterar nome de usuário: ${e.message}`);

    return {
      succsess: false,
      message: `Erro ao alterar nome de usuário`,
    };
  }
};
