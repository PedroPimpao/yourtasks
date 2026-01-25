import { Task } from "@prisma/client";
import { Card } from "./ui/card";
import SummaryDataFormat from "./summary-data-format";
import DateFormat from "./date-format";

interface TaskInfo {
  task: Task;
}

const TaskDetailsCard = ({ task }: TaskInfo) => {
  return (
    <>
      <Card className="m-4 flex items-center justify-center p-3">
        <div className="felx flex-col gap-3 text-justify">
            {task.title && (
              <SummaryDataFormat label="Título" data={task?.title} />
            )}
            {task.description && (
              <SummaryDataFormat label="Descrição" data={task?.description} />
            )}
            {task.priority && (
              <SummaryDataFormat
                label="Nível de Prioridade"
                data={task?.priority}
              />
            )}
            {task.dueDate && (
              <span className="flex flex-row gap-2">
                Data de vencimento:
                <DateFormat date={task.dueDate} />
              </span>
            )}
        </div>
      </Card>
    </>
  );
};

export default TaskDetailsCard;
