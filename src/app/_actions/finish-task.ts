"use server";

import { db } from "@/src/lib/prisma";

interface FinishTaskProps {
  taskID: string;
}

export const finishTask = async ({ taskID }: FinishTaskProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      isCompleted: true,
      inProcess: false,
      isPending: false,
      status: "Concluido",
    },
  });
};
