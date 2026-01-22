import DateFormat from "./date-format";
import { Card } from "./ui/card";

interface TaskItemProps {
  taskTitle: string;
  taskPriority: string;
  taskStatus: string;
  taskDueDate?: Date | null;
}

const TaskCard = ({
  taskTitle,
  taskPriority,
  taskStatus,
  taskDueDate,
}: TaskItemProps) => {
  return (
    <Card className="m-2 flex h-full flex-col py-0">
      <div className="w-full flex-1 rounded-t-md p-2 justify-center items-center flex">
        <h2 className="font-semibold">{taskTitle}</h2>
      </div>
      <div className="bg-accent flex shrink-0 flex-col rounded-b-md border-t border-solid p-3 gap-3">
        <div className="flex justify-around flex-row">
          <div className="flex flex-row gap-2">
            <h3 className="text-sm font-semibold">Prioridade: </h3>
            <span className="text-sm capitalize">{taskPriority}</span>
          </div>
          <div className="flex flex-row gap-2">
            <h3 className="text-sm font-semibold">Status: </h3>
            <span className="text-sm capitalize">{taskStatus}</span>
          </div>
        </div>
        {taskDueDate && (
          <div className="flex flex-row gap-2 items-center justify-center">
            <h3 className="text-sm font-semibold">Data de Vencimento: </h3>
            <DateFormat date={taskDueDate}/>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
