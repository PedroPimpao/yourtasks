import { useState } from "react";
import { UpdateUsernameForm } from "./forms/update-username-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const UpdateUsernameDialog = () => {
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
            <DialogTitle>Novo nome de usuário</DialogTitle>
          </DialogHeader>
          <UpdateUsernameForm closeDialog={closeDialog}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUsernameDialog;
