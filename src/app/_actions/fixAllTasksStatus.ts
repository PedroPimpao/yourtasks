"use server";

import { getTasks } from "./getTasks";
import { updateToIsPending } from "./update-to-pending";
import { updateToInProcess } from "./update-to-in-process";
import { updateToCompleted } from "./updateToCompleted";

export const fixAllTasksStatus = async () => {
  const allTasks = await getTasks();
  allTasks.map((task) => {
    if (task.isPending) {
      updateToIsPending(task.id);
    }
    if (task.inProcess) {
      updateToInProcess(task.id);
    }
    if (task.isCompleted) {
      updateToCompleted(task.id);
    }
  });
};
