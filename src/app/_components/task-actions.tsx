"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { startTask } from "../_actions/change_task_status/start-task";
import { finishTask } from "../_actions/change_task_status/finish-task";
import { deleteTask } from "../_actions/_crud/deleteTask";

interface TaskActionsProps {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonLabel: string;
  action: "start" | "finish" | "delete";
  taskID: string;
  actionVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export const TaskActions = ({
  dialogTitle,
  dialogDescription,
  actionButtonLabel,
  actionVariant,
  action,
  taskID,
}: TaskActionsProps) => {
  const handleAction = async () => {
    try {
      if (action === "start") {
        const { success, errorMessage } = await startTask({ taskID: taskID });
        if (!success) {
          toast.error(errorMessage || "Erro ao iniciar a tarefa", {
            position: "top-left",
          });
          return;
        }
        toast.success("Tarefa iniciada com sucesso", { position: "top-left" });
      }

      if (action === "finish") {
        const { success, errorMessage } = await finishTask({ taskID: taskID });
        if (!success) {
          toast.error(errorMessage || "Erro ao finalizar a tarefa", {
            position: "top-left",
          });
          return;
        }
        toast.success("Tarefa finalizada com sucesso", {
          position: "top-left",
        });
      }

      if (action === "delete") {
        const { success, errorMessage } = await deleteTask({ taskId: taskID });
        if (!success) {
          toast.error(errorMessage || "Erro ao excluir a tarefa", {
            position: "top-left",
          });
          return;
        }
        toast.success("Tarefa excluída com sucesso", { position: "top-left" });
      }
    } catch (error) {
      toast.error("Erro ao executar a ação", { position: "top-left" });
      console.log(`Erro ao executar a ação: ${error}`);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="" asChild>
          <Button variant={actionVariant} className="w-[50%]">
            {actionButtonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-between gap-2">
            <DialogClose className="" asChild>
              <Button variant={"outline"} className="w-[50%]">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose className="" asChild>
              <Button
                variant={actionVariant}
                className="w-[50%]"
                onClick={handleAction}
              >
                {actionButtonLabel}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};