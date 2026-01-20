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
  if (!newPriority) {
    return;
  }

  const updatedTask = await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      priority: newPriority,
    },
  });
  revalidatePath(`/tasks/${taskID}`);
  return updatedTask;
};
