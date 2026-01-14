import { Task } from "@prisma/client";

interface TaskItemProps {
    task: Task
}

const TaskCard = ({ task }: TaskItemProps) => {
    return ( 
        <>
        {task.id}
        </>
     );
}
 
export default TaskCard;