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
import Link from "next/link";

export const UpdatePasswordDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Redefinir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir senha?</DialogTitle>
            <DialogDescription>
              Ao confirmar, você será redirecionado para a pagina de redefinição
              de senha
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild className="flex-1">
              <Button variant={"outline"}>Cancelar</Button>
            </DialogClose>
            <DialogClose asChild className="flex-1">
              <Link href="/update-password">
                <Button className="w-full">Continuar</Button>
              </Link>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
