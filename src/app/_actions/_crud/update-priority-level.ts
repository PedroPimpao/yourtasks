"use server";

import { db } from "@/src/lib/prisma";
import { getTasks } from "./getTasks";

interface UpdatePriorityLevelProps {
  taskID?: string;
  currentPriority?: string;
}

export const updateToPriorityLevelOne = async ({
  taskID,
}: UpdatePriorityLevelProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      priorityLevel: 1,
    },
  });
};

export const updateToPriorityLevelTwo = async ({
  taskID,
}: UpdatePriorityLevelProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      priorityLevel: 2,
    },
  });
};

export const updateToPriorityLevelThree = async ({
  taskID,
}: UpdatePriorityLevelProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      priorityLevel: 3,
    },
  });
};

export const updateToPriorityLevelFour = async ({
  taskID,
}: UpdatePriorityLevelProps) => {
  await db.task.update({
    where: {
      id: taskID,
    },
    data: {
      priorityLevel: 4,
    },
  });
};

export const updatePriorityLevelAllTasks = async () => {
  const allTasks = await getTasks();
  allTasks.map((task: any) => {
    if (task.priority === "baixa") {
      updateToPriorityLevelFour({ taskID: task.id });
    }
    if (task.priority === "media") {
      updateToPriorityLevelThree({ taskID: task.id });
    }
    if (task.priority === "alta") {
      updateToPriorityLevelTwo({ taskID: task.id });
    }
    if (task.priority === "urgente") {
      updateToPriorityLevelOne({ taskID: task.id });
    }
  });
};

export const getPriorityLevelUniqueTask = async ({
  currentPriority,
}: UpdatePriorityLevelProps) => {
  let newPriorityLevel = null;
  if (currentPriority === "baixa") {
    newPriorityLevel = 4;
  }
  if (currentPriority === "media") {
    newPriorityLevel = 3;
  }
  if (currentPriority === "alta") {
    newPriorityLevel = 2;
  }
  if (currentPriority === "urgente") {
    newPriorityLevel = 1;
  }
  return newPriorityLevel;
};
