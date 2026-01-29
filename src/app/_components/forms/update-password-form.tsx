"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { updatePassword } from "../../_actions/_auth/update-password";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, { message: `Mínimo de 8 caracteres` }),
    newPassword: z.string().min(8, { message: `Mínimo de 8 caracteres` }),
    confirmNewPassword: z
      .string()
      .min(8, { message: `Mínimo de 8 caracteres` }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: `As senhas não coincidem`,
    path: ["confirmNewPassword"],
  });

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const UpdatePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (formData: UpdatePasswordFormValues) => {
    try {
      const { success, errorMessage } = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });
      if (!success) {
        toast.error(errorMessage || "Erro ao atualizar a senha", {
          position: "top-left",
        });
        return;
      }
      toast.success("Senha atualizada com sucesso!", { position: "top-left" });
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao executar a ação: ${e.message}`);
      toast.error("Erro ao executar a ação", { position: "top-left" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showCurrentPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showCurrentPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <Link href={"/forgot-password"}>
                  <span className="ml-3 text-sm text-green-300">
                    Esqueci minha senha
                  </span>
                </Link>
              </FormItem>
            )}
          />

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
                      type={showNewPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showNewPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a nova senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showConfirmNewPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                    >
                      {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showConfirmNewPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant={"default"} type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 />
                Atualizando
              </>
            ) : (
              "Atualizar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
