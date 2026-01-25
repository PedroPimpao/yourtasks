import { useEffect, useState } from "react";
import { getLastTaskClient } from "../_actions/get-last-wrapper";
import { Task } from "@prisma/client";
import TaskDetailsCard from "./task-details-card";

const CreateTaskSummary = () => {
  const [lastTask, setTask] = useState<Task | null>(null);

  useEffect(() => {
    getLastTaskClient().then(setTask);
  }, []);

  if (!lastTask) return null;

  return (
      <TaskDetailsCard task={lastTask} />
  );
};

export default CreateTaskSummary;
