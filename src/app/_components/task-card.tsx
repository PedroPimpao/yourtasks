import { Badge } from "./ui/badge";

interface TaskItemProps {
    taskTitle: string
    taskPriority: string
}

const TaskCard = ({ taskTitle, taskPriority }: TaskItemProps) => {
    return (
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row w-full justify-between ">
          <h2 className="font-semibold">{taskTitle}</h2>
          <Badge variant={"outline"}>
            {taskPriority}
          </Badge>
        </div>
      </div>
    );
}
 
export default TaskCard;