import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UpdatePasswordForm } from "./forms/update-password-form";

export const UpdatePasswordDialog = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const closeDialog = () => {
    setDialogIsOpen(false);
  };

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Redefinir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir senha</DialogTitle>
          </DialogHeader>
          <UpdatePasswordForm closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};