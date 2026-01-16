import { useEffect, useState } from "react";
import { getLastTaskClient } from "../_actions/get-last-wrapper";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  priority: "alta" | "media" | "baixa";
  dueDate?: string | null;
};

const CreateTaskSummary = () => {
  const [lastTask, setTask] = useState<Task | null>(null);
  useEffect(() => {
    getLastTaskClient().then(setTask);
  }, []);

  if (!lastTask) return null;

  return (
    <div>
      Título: {lastTask?.title}
      Descrição: {lastTask?.description}
      Nível de Prioridade: {lastTask?.priority}
      Data de vencimento: {lastTask?.dueDate?.getDate()}
    </div>
  );
};

export default CreateTaskSummary;
