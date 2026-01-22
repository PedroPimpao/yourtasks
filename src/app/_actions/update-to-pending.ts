"use server";

import { db } from "@/src/lib/prisma";

export const updateToIsPending = async (taskID: string) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      status: "Pendente",
    },
  });
};
