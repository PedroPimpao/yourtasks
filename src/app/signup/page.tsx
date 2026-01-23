import Link from "next/link";
import SocialAuthOptions from "../_components/social-auth-options";
import { SignUpForm } from "./_components/signup-form";
import { redirect } from "next/navigation";
import { getServerSession } from "../_actions/get-server-session";

const SignUp = async () => {
  const data = await getServerSession()

  if (data?.user) {
    redirect("/");
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Crie sua conta para começar a usar o YourTasks!
          </p>
        </div>
        <SignUpForm />

        <div className="flex flex-row">
          <div className="mt-3 h-px w-[50%] bg-gray-300 dark:bg-gray-600"></div>
          <p className="mr-2 ml-2 text-sm text-gray-500 dark:text-gray-400">
            ou
          </p>
          <div className="mt-3 h-px w-[50%] bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <SocialAuthOptions />
        <div className="mt-3 h-px w-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-row gap-2 text-sm">
          <p>Já possui uma conta?</p>
          <Link href={"/login"} className="text-green-300 hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
