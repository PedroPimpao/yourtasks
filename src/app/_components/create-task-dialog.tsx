import { Loader2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { RadioGroup } from "./ui/radio-group";
import RadioItem from "./radio-item";

const CreateTaskDialog = () => {
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  const closeCreateTaskDialog = () => {
    setCreateDialogIsOpen(false);
  };

  const taskSchema = z.object({
    title: z
      .string()
      .min(3, { message: "O título deve ter no mínimo 3 caracteres" }),
    description: z.string().optional(),
    dueDate: z
      .date({
        message: "Data de vencimento inválida",
      })
      .optional(),
    priority: z.enum(["alta", "media", "baixa", "urgente"], {
      message: "Prioridade inválida",
    }),
  });

  type TaskFormValues = z.infer<typeof taskSchema>;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
      priority: "media",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log("Creating task:", data);
  };

  return (
    <>
      <Dialog open={createDialogIsOpen} onOpenChange={setCreateDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus /> Nova Tarefa
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar tarefa</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insura o título da tarefa..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Insira a descrição da tarefa..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center justify-around gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="">Prioridade</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="ml-4 flex flex-row justify-around"
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <RadioItem id="r1" value="baixa" label="Baixa" />
                          <RadioItem id="r2" value="media" label="Média" />
                          <RadioItem id="r3" value="alta" label="Alta" />
                          <RadioItem id="r4" value="urgente" label="Urgente" />
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mt-6">Data de vencimento</FormLabel>
                      <div className="flex justify-center">
                        <FormControl className="">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            disabled={{ before: new Date() }}
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row gap-2">
                <DialogClose
                  className="flex w-full flex-row justify-around gap-2"
                  asChild
                >
                  <Button
                    variant={"outline"}
                    type="reset"
                    className="w-[50%] cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant={"default"}
                  type="submit"
                  className="w-[50%] cursor-pointer"
                  onClick={closeCreateTaskDialog}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 />
                      Cadastrando
                    </>
                  ) : (
                    "Criar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskDialog;
