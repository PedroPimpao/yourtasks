import { getServerSession } from "../_actions/_auth/get-server-session";
import { getUser } from "../_actions/_auth/get-user";
import Header from "../_components/header";
import { Separator } from "../_components/ui/separator";
import { getInProcessTasks } from "../_actions/_crud/get-inprocess-tasks";
import { TaskCard } from "../_components/task-card";

const InProcessPage = async () => {
  const data = await getServerSession();
  const user = await getUser({ userID: data?.user.id });
  const inProcessTasks = await getInProcessTasks();

  return (
    <>
      <Header user={user} />
      <h1 className="m-4 text-2xl font-semibold">Tarefas em andamento</h1>
      <Separator />

      {inProcessTasks.length > 0 ? (
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 m-3">
          {inProcessTasks.map((task) => (
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
          <h2 className="font-semibold">Nenhuma tarefa em andamento</h2>
        </div>
      )}
    </>
  );
};

export default InProcessPage;
