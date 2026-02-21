import { getServerSession } from "../_actions/_auth/get-server-session";
import { getUser } from "../_actions/_auth/get-user";
import { getFinishedTasks } from "../_actions/_crud/get-finished-tasks";
import Header from "../_components/header";
import { Separator } from "../_components/ui/separator";
import { TaskCard } from "../_components/task-card";
import { getStats } from "../_actions/_crud/get-stats";

const FinishedPage = async () => {
  const data = await getServerSession();
  const user = await getUser({ userID: data?.user.id });
  const finishedTasks = await getFinishedTasks();
  const stats = await getStats()

  return (
    <>
      <Header user={user} />
      <h1 className="m-4 text-2xl font-light">Tarefas concluídas: {stats?.tasksCompleted}</h1>
      <Separator />

      {finishedTasks.length > 0 ? (
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 m-3">
          {finishedTasks.map((task) => (
            <div key={task.id}>
              <TaskCard
                key={task.id}
                taskTitle={task.title}
                taskPriority={task.priority}
                taskStatus={task.status}
                taskDueDate={task.dueDate}
                taskHref={`/tasks/${task.id}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-60 flex w-full items-center justify-center">
          <h2 className="font-semibold">Nenhuma tarefa foi concluída</h2>
        </div>
      )}
    </>
  );
};

export default FinishedPage;