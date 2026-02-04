import Link from "next/link";
import { Button } from "../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ResetPasswordForm } from "../_components/forms/reset-password-form";
import { Suspense } from "react";
import Loading from "../_components/loader";

const ResetPasswordPage = async () => {
  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        <Link href={"/forgot-password"} className="absolute top-0 left-0 m-4">
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Recuperação de conta</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Defina sua nova senha para continuar!
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
