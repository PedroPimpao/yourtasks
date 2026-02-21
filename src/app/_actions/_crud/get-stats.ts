"use server";

import { db } from "@/src/lib/prisma";
import { getServerSession } from "../_auth/get-server-session";

export const getStats = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    return ;
  }

  const pendingTasks = await db.task.count({
    where: {
      userId: data?.user.id,
      isPending: true,
    },
  });

  const tasksInProcess = await db.task.count({
    where: {
      userId: data?.user.id,
      inProcess: true,
    },
  });

  const tasksCompleted = await db.task.count({
    where: {
      userId: data?.user.id,
      isCompleted: true,
    },
  });

  const basicTasks = await db.task.count({
    where: {
      userId: data?.user.id,
      priority: "baixa",
    },
  });

  const mediumTasks = await db.task.count({
    where: {
      userId: data?.user.id,
      priority: "media",
    },
  });

  const hardTasks = await db.task.count({
    where: {
      userId: data?.user.id,
      priority: "alta",
    },
  });

  const urgentTasks = await db.task.count({
    where: {
      userId: data?.user.id,
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
