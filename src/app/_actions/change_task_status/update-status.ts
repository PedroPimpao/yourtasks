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
