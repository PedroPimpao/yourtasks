"use client";
import { useSession } from "../lib/auth-client";
import Header from "./_components/header";
import { Badge } from "./_components/ui/badge";
import { defaultTasksData } from "./_constants/default-tasks-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./_components/ui/button";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "./_components/ui/dialog";
import CreateTaskForm from "./_components/create-task-form";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <Header />
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="font-bold">
            Olá, {data?.user ? data.user.name : "Visitante"}!
          </div>
          <div>
            <span className="capitalize">
              {format(new Date(), "EEEE, ", { locale: ptBR })}
            </span>
            <span className="">
              {format(new Date(), "d 'de' ", { locale: ptBR })}
            </span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </div>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="cursor-pointer">
              <Plus /> Nova Tarefa
            </Button>
          </DialogTrigger>
          <CreateTaskForm/>
        </Dialog>
      </div>

      <div className="flex flex-row items-center justify-around p-4">
        <Badge className="" variant={"outline"}>
          3 Pendentes
        </Badge>
        <Badge>0 Concluídos</Badge>
        <Badge className="bg-orange-400">0 Em andamento</Badge>
      </div>

      {defaultTasksData.map((task) => (
        <div key={task.id} className="">
          <Link href={`/tasks/${task.id}`}>
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <Button size={"icon"} variant={"outline"}>
                <Loader />
              </Button>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
