"use client"
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UpdateTaskForm from "./update-task-form";
import { useState } from "react";

interface UpdateTaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate?: Date;
  };
}

const UpdateTaskDialog = ({ task }: UpdateTaskProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const closeDialog = () => {
    setDialogIsOpen(false)
  }
  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarefa</DialogTitle>
          </DialogHeader>
          <UpdateTaskForm
            taskID={task.id}
            task={{
              title: task.title,
              description: task?.description,
              dueDate: task?.dueDate,
            }}
            closeDialog={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTaskDialog;
