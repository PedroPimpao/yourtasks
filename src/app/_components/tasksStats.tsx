import { getStats } from "../_actions/get-stats";
import { Badge } from "./ui/badge";

const TasksStats = async () => {
  const tasksStats = await getStats();

  return (
    <>
      {tasksStats && (
        <div className="flex flex-row items-center justify-around p-4">
          <Badge className="" variant={"outline"}>
            {tasksStats.pendingTasks} Pendentes
          </Badge>
          <Badge>{tasksStats.tasksCompleted} Concluídos</Badge>
          <Badge className="bg-orange-400">
            {tasksStats.tasksInProcess} Em andamento
          </Badge>
        </div>
      )}
    </>
  );
};

export default TasksStats;
