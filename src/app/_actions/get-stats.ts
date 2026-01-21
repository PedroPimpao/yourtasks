"use server";

import { db } from "@/src/lib/prisma";

export const getStats = async () => {
  const pendingTasks = await db.task.count({
    where: {
      isPending: true,
    },
  });

  const tasksInProcess = await db.task.count({
    where: {
      inProcess: true,
    },
  });

  const tasksCompleted = await db.task.count({
    where: {
      isCompleted: true,
    },
  });

  const basicTasks = await db.task.count({
    where: {
      priority: "baixa",
    },
  });

  const mediumTasks = await db.task.count({
    where: {
      priority: "media",
    },
  });

  const hardTasks = await db.task.count({
    where: {
      priority: "alta",
    },
  });

  const urgentTasks = await db.task.count({
    where: {
      priority: "urgente",
    },
  });

  return {
    pendingTasks,
    tasksInProcess,
    tasksCompleted,
    basicTasks,
    mediumTasks,
    hardTasks,
    urgentTasks,
  };
};
