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

interface AlertTaskDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  actionButtonLabel: string;
  actionFunction: () => void;
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

const AlertTaskDialog = ({
  dialogTitle,
  dialogDescription,
  actionButtonLabel,
  actionVariant,
  actionFunction,
}: AlertTaskDialogProps) => {
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
                onClick={actionFunction}
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

export default AlertTaskDialog;
