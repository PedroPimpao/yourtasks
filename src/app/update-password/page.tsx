import Link from "next/link";
import { Button } from "../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { UpdatePasswordForm } from "../_components/forms/update-password-form";

const UpdatePasswordPage = async () => {
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
            <h1 className="text-3xl font-bold">Redefinição de senha</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Defina sua nova senha!
            </p>
          </div>
          <UpdatePasswordForm/>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordPage;
