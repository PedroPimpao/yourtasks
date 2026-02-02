"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface FinishTaskProps {
  taskID: string;
}

export const finishTask = async ({ taskID }: FinishTaskProps) => {
  if (!taskID || taskID.length === 0) {
    return {
      success: false,
      errorMessage: "ID da tarefa é obbrigatório",
    };
  }
  try {
    await db.task.update({
      where: {
        id: taskID,
      },
      data: {
        isCompleted: true,
        inProcess: false,
        isPending: false,
        status: "Concluido",
        statusLevel: 3
      },
    });

    revalidatePath(`/tasks/${taskID}`);
    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error;
    console.log(`Erro ao finalizar a tarefa: ${e.message}`);
    return {
      success: false,
      errorMessage: `Erro ao finalizar a tarefa`,
    };
  }
};
