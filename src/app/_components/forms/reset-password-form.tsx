"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { resetPassword } from "../../_actions/_auth/reset-password";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter()
  
  const onSubmit = async ({
    newPassword,
    confirmNewPassword,
  }: ResetPasswordFormValues) => {
    const token = searchParams.get("token");
    if (!newPassword || newPassword.length === 0) {
      toast.error(`Nova senha é necessária`, { position: "top-left" });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("As senhas não coincidem", { position: "top-left" });
      return;
    }
    try {
      const { success, errorMessage } = await resetPassword({
        token: token,
        newPassword,
        confirmNewPassword,
      });

      if (!success) {
        toast.error(errorMessage || "Erro ao redefinir a senha", {
          position: "top-left",
        });
        return;
      }

      toast.success("Senha redefinida com sucesso!", { position: "top-left" });
      router.replace('/login')

    } catch (error) {
      const e = error as Error;
      console.log(`[ERRO] Erro ao redefinir a senha: ${e.message}`);
      toast.error("[ERRO] Erro ao redefinir a senha", { position: "top-left" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar nova senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Insira sua senha..."
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">
                      {showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
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
              Confirmando
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </form>
    </Form>
  );
};
