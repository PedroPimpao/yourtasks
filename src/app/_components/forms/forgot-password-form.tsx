"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { forgotPassword } from "../../_actions/_auth/forgot-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { findEmail } from "../../_actions/_auth/find-email";

const forgotPasswordSchema = z
  .object({
    email: z.email({ message: "Email inválido" }),
  })
  .refine(
    async (data) => {
      const user = await findEmail(data.email);
      return !!user;
    },
    { message: "Usuário não encontrado", path: ["email"] },
  );

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: ForgotPasswordFormValues) => {
    try {
      const { success, errorMessage } = await forgotPassword({
        userEmail: formData.email,
      });
      if (!success) {
        toast.error(errorMessage || "Erro ao solicitar redefinição de senha", {
          position: "top-left",
        });
        return;
      }
      toast.success(
        "Instruções de recuperação de senha enviadas para seu email!",
        { position: "top-left" },
      );
    } catch (error) {
      const e = error as Error;
      toast.error("Erro ao executar a ação");
      console.log(`Erro ao executar a ação: ${e.message}`);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Insira seu email" />
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
                Confirmando...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
