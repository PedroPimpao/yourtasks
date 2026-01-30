import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { DeleteUserForm } from "./forms/delete-user-form";

const DeleteUserFlow = () => {
  const [alertDialogInOpen, setAlertDialogInOpen] = useState(false);
  const [formDialogIsOpen, setFormDialogIsOpen] = useState(false);

  const flowToNextStep = () => {
    setAlertDialogInOpen(false);
    setFormDialogIsOpen(true);
  };

  const closeFormDialog = () => {
    setFormDialogIsOpen(false)
  }

  return (
    <>
      <Dialog open={alertDialogInOpen} onOpenChange={setAlertDialogInOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Excluir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir conta?</DialogTitle>
            <DialogDescription>
              Esta ação é irreversível e excluirá permanentemente sua conta.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild className="flex-1">
              <Button variant={"outline"}>Cancelar</Button>
            </DialogClose>
            <DialogClose asChild className="flex-1">
              <Button variant={"destructive"} onClick={flowToNextStep}>
                Confirmar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={formDialogIsOpen} onOpenChange={setFormDialogIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Digite sua senha para confirmar a exclusão da conta permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DeleteUserForm closeFormDialog={closeFormDialog}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteUserFlow;
