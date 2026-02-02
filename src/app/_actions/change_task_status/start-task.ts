"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface StartTaskProps {
  taskID: string;
}

export const startTask = async ({ taskID }: StartTaskProps) => {
  if(!taskID || taskID.length === 0) {
    return {
      success: false,
      errorMessage: "ID da tarefa é obrigatório", 
    }
  }
  try {
    await db.task.update({
      where: {
        id: taskID,
      },
      data: {
        isCompleted: false,
        inProcess: true,
        isPending: false,
        status: "Em andamento",
        statusLevel: 2
      },
    });
    revalidatePath(`/tasks/${taskID}`);
    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    const e = error as Error
    console.log(`Erro ao iniciar a tarefa: ${e.message}`)
    return {
      success: false,
      errorMessage: `Erro ao iniciar a tarefa`
    }
  }
};
