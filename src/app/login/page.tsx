import Link from "next/link";
import SocialAuthOptions from "../_components/social-auth-options";
import { LoginForm } from "./_components/login-form";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Entre na sua conta para usar o YourTasks!
          </p>
        </div>

        <LoginForm/>

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
          <p>Ainda não possui uma conta?</p>
          <Link href={"/signup"} className="text-green-300 hover:underline">
            Cadastre-se agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;