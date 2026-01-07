"use client";

import { authClient } from "@/src/lib/auth-client";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../_components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../../_components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
const signupSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

type SignUpFormValues = z.infer<typeof signupSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: SignUpFormValues) => {
    const {} = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          console.log(`CADASTRADO: ${ctx.data}`);
          router.replace("/");
        },
        onError: (err) => {
          console.log(`ERRO: ${err.error}`);
        },
      },
    );
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
            "Entrando"
          )}
        </Button>
      </form>
    </Form>
  );
}
