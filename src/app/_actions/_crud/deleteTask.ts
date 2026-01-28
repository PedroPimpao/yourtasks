"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteTaskProps {
  taskId: string;
}

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  if (!taskId || taskId.length === 0) {
    return {
      success: false,
      errorMessage: "ID da tarefa é obrigatório",
    };
  }
  try {
    await db.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath(`/tasks/${taskId}`);
    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`Erro ao excluir a tarefa: ${e.message}`);
    return {
      success: false,
      errorMessage: `Erro ao excluir a tarefa`,
    };
  }
};
