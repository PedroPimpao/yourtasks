"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdatePriorityProps {
  taskID: string;
  newPriority?: string;
}

export const updatePriority = async ({
  taskID,
  newPriority,
}: UpdatePriorityProps) => {
  try {
    if (!newPriority) {
      return {
        success: false,
        message: `[ERRO] Selecione uma prioridade`,
      };
    }

    const updatedTaskPriority = await db.task.update({
      where: {
        id: taskID,
      },
      data: {
        priority: newPriority,
      },
    });
    
    revalidatePath(`/tasks/${taskID}`);
    return {
      updatedTaskPriority,
      success: true,
      message: `Prioridada alterada com sucesso`,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: `Erro ao alterar prioridade`,
      errorMessage: `[ERRO] Erro ao alterar prioridade: ${e.message}`,
    };
  }
};