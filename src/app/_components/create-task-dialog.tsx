"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  // DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import CreateTaskSummary from "./create-task-summary";
import CreateTaskForm from "./create-task-form";
import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";

const CreateTaskDialog = () => {
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
  const [summaryDrawerIsOpen, setSummaryDrawerIsOpen] = useState(false);
  const { data } = useSession();

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
          {data?.user ? (
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

      <Drawer
        open={summaryDrawerIsOpen}
        onOpenChange={setSummaryDrawerIsOpen}
        direction="right"
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Resumo da Tarefa</DrawerTitle>
          </DrawerHeader>
            <CreateTaskSummary />
          <div className="flex justify-center pr-4 pl-4">
            <DrawerClose asChild className="">
              <Button className="w-full">Fechar</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateTaskDialog;
