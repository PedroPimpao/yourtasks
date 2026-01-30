"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { changeEmail } from "../../_actions/_auth/change-email";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const changeEmailSchema = z.object({
  newEmail: z.email({ message: "Email inválido" }),
});

type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

export const ChangeEmailForm = () => {
  const router = useRouter();
  const form = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async ({ newEmail }: ChangeEmailFormValues) => {
    if (!newEmail) {
      toast.error("Insira o novo email", { position: "top-left" });
      return;
    }

    try {
      const { success, message } = await changeEmail({
        newEmail,
      });

      if (!success) {
        toast.error(message || "Erro ao atualizar email", {
          position: "top-left",
        });
        return;
      }

      toast.success(
        message ||
          "Confirme a alteração clicando no link na caixa de correio do email atual!",
        {
          position: "top-left",
        },
      );

      router.replace("/login");
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao atualizar email: ${e.message}`);
      toast.error("Erro ao atualizar email", { position: "top-left" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira seu novo endereço de email..."
                  />
                </FormControl>
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
