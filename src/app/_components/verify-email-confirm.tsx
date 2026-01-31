import { toast } from "sonner";
import { getServerSession } from "../_actions/_auth/get-server-session";
import { verifyEmail } from "../_actions/_auth/verify-email";
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
import { useRouter } from "next/navigation";

const VerifyEmailConfirm = () => {
  const router = useRouter();
  const onVerify = async () => {
    const data = await getServerSession();

    if (!data?.user) {
      toast.error("Usuário não autenticado", { position: "top-left" });
      return;
    }

    if (data?.user.emailVerified) {
      toast.error("Seu email já está verificado", { position: "top-left" });
      return;
    }

    try {
      const { success, message } = await verifyEmail(data.user.email);

      if (!success) {
        toast.error(message || "Erro ao enviar email de verificação", {
          position: "top-left",
        });
        return;
      }

      toast.success(message || "Email de verificação enviado com sucesso!", {
        position: "top-left",
      });
      router.replace("/");
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao enviar email de verificação: ${e.message}`);
      toast.error("Erro ao enviar email de verificação");
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Verificar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificação de email</DialogTitle>
            <DialogDescription>
              Ao confirmar você receberá um email de verificação.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild className="flex-1">
              <Button variant={"outline"}>Cancelar</Button>
            </DialogClose>
            <DialogClose asChild className="flex-1">
              <Button variant={"default"} onClick={onVerify}>
                Confirmar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyEmailConfirm;
