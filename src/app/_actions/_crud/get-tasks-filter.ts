"use server";

import { db } from "@/src/lib/prisma";

interface GetFilteredTasksProps {
  filter: string;
}

export const getFilteredTasks = async ({ filter }: GetFilteredTasksProps) => {
  if (filter === "isPending") {
    await db.task.findMany({
      where: {
        isPending: true,
      },
    });
  }

  if (filter === "inProcess") {
    await db.task.findMany({
      where: {
        inProcess: true,
      },
    });
  }

  if (filter === "isCompleted") {
    await db.task.findMany({
      where: {
        isCompleted: true,
      },
    });
  }
};
