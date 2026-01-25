"use server";

import { db } from "@/src/lib/prisma";

interface StartTaskProps {
  taskID: string;
}

export const startTask = async ({ taskID }: StartTaskProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      isCompleted: false,
      inProcess: true,
      isPending: false,
      status: "Em andamento",
    },
  });
};
