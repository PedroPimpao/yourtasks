"use server";

import { db } from "@/src/lib/prisma";

export const updateToIsPending = async (taskID: string) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      status: "Pendente",
      statusLevel: 1
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
      statusLevel: 2
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
      statusLevel: 3
    },
  });
};
