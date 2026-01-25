"use server";

import { getTasks } from "../_crud/getTasks";
import { updateToCompleted, updateToInProcess, updateToIsPending } from "./update-status";

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
