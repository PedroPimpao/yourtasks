import { authClient } from "@/src/lib/auth-client";

const signInWithGoogle = async () => {
  let success = false;
  let message = "";
  await authClient.signIn.social(
    {
      provider: "google",
    },
    {
      onSuccess: () => {
        success = true;
        message = "Conectado com sucesso!";
        console.log(message);
      },
      onError: (ctx) => {
        success = false;
        message = "Erro ao conectar";
        console.log(`${message}: ${ctx.error.message}`);
      },
    },
  );
  return { success, message };
};

const signInWithGithub = async () => {
  let success = false;
  let message = "";
  await authClient.signIn.social(
    {
      provider: "github",
    },
    {
      onSuccess: () => {
        success = true;
        message = "Conectado com sucesso!";
        console.log(message);
      },
      onError: (ctx) => {
        success = false;
        message = "Erro ao conectar";
        console.log(`${message}: ${ctx.error.message}`);
      },
    },
  );
  return { success, message };
};

export { signInWithGithub, signInWithGoogle };
