import { Card } from "./ui/card";

interface TaskItemProps {
  taskTitle: string;
  taskPriority: string;
  taskStatus: string
}

const TaskCard = ({ taskTitle, taskPriority, taskStatus }: TaskItemProps) => {
  return (
    <Card className="m-2 flex h-full flex-col py-0">
      <div className="w-full flex-1 rounded-t-md p-3">
        <h2 className="font-semibold">{taskTitle}</h2>
      </div>
      <div className="bg-accent shrink-0 rounded-b-md border-t border-solid p-3">
        <div className="flex flex-row gap-2">
          <h3 className="text-sm font-semibold">Prioridade: </h3>
          <span className="text-sm capitalize">{taskPriority}</span>
        </div>
        <div className="flex flex-row gap-2">
          <h3 className="text-sm font-semibold">Status: </h3>
          <span className="text-sm capitalize">{taskStatus}</span>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
