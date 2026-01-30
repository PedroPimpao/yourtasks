import Link from "next/link";
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

const ChangeEmailDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Redefinir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir Email</DialogTitle>
            <DialogDescription>
              Deseja redefinir email? Ao confirmar você será redirecionado para
              a página de redefinição de email
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild>
              <Button variant={"outline"} className="flex-1">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Link href={"/change-email"} className="flex-1">
                <Button variant={"default"} className="w-full">
                  Prosseguir
                </Button>
              </Link>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeEmailDialog;
