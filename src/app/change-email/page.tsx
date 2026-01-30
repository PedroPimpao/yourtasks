import Link from "next/link";
import { Button } from "../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ChangeEmailForm } from "../_components/forms/change-email-form";
import { getServerSession } from "../_actions/_auth/get-server-session";
import { redirect } from "next/navigation";

const ChangeEmailPage = async () => {
  const data = await getServerSession();
  if (!data?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <Link href={"/settings"} className="absolute top-0 left-0 m-4">
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Redefinição de email</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Insira seu novo email! Você receberá um email de confirmação de
              alteração no endereço atual. Após isso, receberá um email de
              verificação no novo endereço, e enfim seu email estará atualizado
            </p>
          </div>
          <ChangeEmailForm />
        </div>
      </div>
    </>
  );
};

export default ChangeEmailPage;
