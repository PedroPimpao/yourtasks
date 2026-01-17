import { useEffect, useState } from "react";
import { getLastTaskClient } from "../_actions/get-last-wrapper";
import { Task } from "@prisma/client";
import DateFormat from "./date-format";
import { Card } from "./ui/card";
import SummaryDataFormat from "./summary-data-format";

const CreateTaskSummary = () => {
  const [lastTask, setTask] = useState<Task | null>(null);

  useEffect(() => {
    getLastTaskClient().then(setTask);
  }, []);

  if (!lastTask) return null;

  return (
    <Card className="m-4 p-3">
      {lastTask.title && (
        <SummaryDataFormat label="Título" data={lastTask?.title} />
      )}
      {lastTask.description && (
        <SummaryDataFormat label="Descrição" data={lastTask?.description} />
      )}
      {lastTask.priority && (
        <SummaryDataFormat
          label="Nível de Prioridade"
          data={lastTask?.priority}
        />
      )}
      {lastTask.dueDate && (
        <span className="flex flex-row gap-2">
          Data de vencimento:
          <DateFormat date={lastTask.dueDate} />
        </span>
      )}
    </Card>
  );
};

export default CreateTaskSummary;
