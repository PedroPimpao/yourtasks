import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "../_actions/_auth/get-server-session";
import ForgotPasswordForm from "../_components/forms/forgot-password-form";
import { Button } from "../_components/ui/button";
import { ChevronLeft } from "lucide-react";

const ForgotPasswordPage = async () => {
  const data = await getServerSession();

  if (data?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <Link href={"/login"} className="absolute top-0 left-0 m-4">
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Recuperação de conta</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Confirme seu email para receber instruções de recuperação de
              senha!
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
