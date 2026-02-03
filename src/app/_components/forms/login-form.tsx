"use client";

import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { signInClient } from "../../_actions/_auth/sign-in-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyEmail } from "../../_actions/_auth/verify-email";
import { findEmail } from "../../_actions/_auth/find-email";

const loginSchema = z
  .object({
    email: z.email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  })
  .refine(
    async (data) => {
      const user = await findEmail(data.email);
      return !!user;
    },
    { message: "Usuário não encontrado", path: ["email"] },
  );

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    const onVerify = async () => {
      await verifyEmail(email);
    };

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.", {
        position: "top-left",
      });
      return;
    }

    try {
      const { success, message, is403Error } = await signInClient({
        email,
        password,
      });

      if (!success) {
        if (is403Error) {
          toast.error(message || "Email não verificado", {
            position: "top-left",
            description: "Verifique seu email antes de continuar.",
            action: {
              label: "Verificar agora",
              onClick: onVerify,
            },
          });
        }
        toast.error(message || "Erro ao conectar", { position: "top-left" });
        return;
      }

      toast.success(message || "Conectado com sucesso!", {
        position: "top-left",
      });
      router.replace("/");
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao conectar: ${e.message}`);
      toast.error("[ERRO] Erro ao conectar. Tente novamente mais tarde", {
        position: "top-left",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Insira seu email..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Insira sua senha..."
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <Link href={"/forgot-password"}>
                <span className="ml-3 text-sm text-green-300">
                  Esqueci minha senha
                </span>
              </Link>
            </FormItem>
          )}
        />
        <Button
          variant={"default"}
          type="submit"
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 />
              Entrando
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
