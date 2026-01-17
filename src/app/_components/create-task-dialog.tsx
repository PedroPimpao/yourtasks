"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
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

const CreateTaskDialog = () => {
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
          <DialogHeader>
            <DialogTitle>Criar tarefa</DialogTitle>
          </DialogHeader>
          <CreateTaskForm showSummary={showSummary} />
        </DialogContent>
      </Dialog>

      <Drawer open={summaryDrawerIsOpen} onOpenChange={setSummaryDrawerIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Resumo da Tarefa</DrawerTitle>
          </DrawerHeader>
          <CreateTaskSummary />
          <DrawerClose asChild>
            <Button className="w-full">Fechar</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateTaskDialog;
