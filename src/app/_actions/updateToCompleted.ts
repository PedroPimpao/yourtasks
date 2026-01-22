"use server";

import { db } from "@/src/lib/prisma";

export const updateToCompleted = async (taskID: string) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      status: "Concluído",
    },
  });
};
