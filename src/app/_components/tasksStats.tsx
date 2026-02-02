"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface TasksStatsProps {
  pendingTasks: number;
  tasksInProcess: number;
  tasksCompleted: number;
}

const TasksStats = ({
  pendingTasks,
  tasksInProcess,
  tasksCompleted,
}: TasksStatsProps) => {
  return (
    <>
      <Card className="flex w-full flex-row flex-nowrap rounded-sm p-4">
        <div className="flex flex-1 flex-row items-center justify-around">
          <Link href={"/pending"}>
            <Badge className="cursor-pointer rounded-sm" variant={"outline"}>
              {pendingTasks} Pendentes
            </Badge>
          </Link>
          <Link href={"/process"}>
            <Badge className="cursor-pointer rounded-sm bg-orange-400">
              {tasksInProcess} Em andamento
            </Badge>
          </Link>
          <Link href={"/finished"}>
            <Badge className="cursor-pointer rounded-sm">
              {tasksCompleted} Concluídos
            </Badge>
          </Link>
        </div>
      </Card>
    </>
  );
};
export { TasksStats };
