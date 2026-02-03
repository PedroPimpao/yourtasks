"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import CreateTaskSummary from "./create-task-summary";
import CreateTaskForm from "./forms/create-task-form";
import Link from "next/link";

interface CreateTaskDialogProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const CreateTaskDialog = ({ user }: CreateTaskDialogProps) => {
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
  const [summaryDrawerIsOpen, setSummaryDrawerIsOpen] = useState(false);

  const closeForm = () => {
    setCreateDialogIsOpen(false);
  };

  const openSummary = () => {
    setSummaryDrawerIsOpen(true);
  };

  const showSummary = () => {
    closeForm();
    openSummary();
  };

  return (
    <>
      <Dialog open={createDialogIsOpen} onOpenChange={setCreateDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus /> Nova Tarefa
          </Button>
        </DialogTrigger>
        <DialogContent>
          {user ? (
            <>
              <DialogHeader>
                <DialogTitle>Criar tarefa</DialogTitle>
              </DialogHeader>
              <CreateTaskForm showSummary={showSummary} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Antes, faça seu login!</DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex w-full flex-row justify-center gap-2">
                <DialogClose asChild className="flex-1">
                  <Button variant={"outline"}>Cancelar</Button>
                </DialogClose>
                <Link href={`/login`} className="flex-1">
                  <Button className="w-full">Fazer login</Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={summaryDrawerIsOpen} onOpenChange={setSummaryDrawerIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resumo da tarefa:</DialogTitle>
          </DialogHeader>
          <CreateTaskSummary />
          <div className="flex justify-center pr-4 pl-4">
            <DialogClose asChild className="">
              <Button className="w-full">Fechar</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskDialog;
