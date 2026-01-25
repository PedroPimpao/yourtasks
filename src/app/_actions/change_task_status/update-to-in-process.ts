"use server";

import { db } from "@/src/lib/prisma";

export const updateToInProcess = async (taskID: string) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      status: "Em andamento",
    },
  });
};
