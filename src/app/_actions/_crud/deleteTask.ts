"use server"

import { db } from "@/src/lib/prisma"

interface DeleteTaskProps {
    taskId: string
}

export const deleteTask = async ({ taskId }: DeleteTaskProps) => {
  const taskDeleted = await db.task.delete({
    where: {
      id: taskId,
    },
  });
  return taskDeleted
};