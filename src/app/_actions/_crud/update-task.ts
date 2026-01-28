"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateTaskProps {
  taskProps: {
    id: string;
    title?: string;
    description?: string;
    dueDate?: Date;
    priority?: string;
  };
}

export const updateTask = async ({ taskProps }: UpdateTaskProps) => {
  try {
    if (!taskProps) {
      return {
        success: false,
        message: `Sem informações para atualizar a tarefa!`,
      };
    }

    const updatedTask = await db.task.update({
      where: {
        id: taskProps.id,
      },
      data: Object.fromEntries(
        Object.entries({
          title: taskProps.title,
          description: taskProps?.description,
          priority: taskProps?.priority,
          dueDate: taskProps?.dueDate,
        }).filter(([_, value]) => value !== undefined),
      ),
    });

    revalidatePath(`/tasks/${taskProps.id}`);

    return {
      updatedTask,
      success: true,
      message: `Tarefa atualizada com sucesso!`,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: `Erro ao atualizar a tarefa`,
      errorMessage: `[ERRO] Erro ao atualizar a tarefa: ${e.message}`,
    };
  }
};
