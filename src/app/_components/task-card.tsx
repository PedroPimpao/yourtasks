"use client";

import Link from "next/link";
import {
  CalendarDays,
  ArrowRight,
  AlertTriangle,
  ChevronUp,
  Minus,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/src/lib/utils";
import DateFormat from "./date-format";

interface TaskItemProps {
  taskTitle: string;
  taskPriority: string;
  taskStatus: string;
  taskDueDate?: Date | null;
  taskHref: string;
}

const normalize = (s: string) => {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const priorityMap: Record<
  string,
  {
    label: string;
    strip: string;
    pill: string;
    btn: string;
    icon: React.ReactNode;
  }
> = {
  baixa: {
    label: "Baixa",
    strip: "bg-green-500",
    pill: "border-green-500/30 text-green-600 bg-green-500/10 hover:bg-green-500/10 dark:text-green-400 dark:border-green-500/30 dark:bg-green-500/10",
    btn: "border-green-500/40 text-green-700 bg-green-500/10 hover:bg-green-600 hover:text-white hover:border-green-600 dark:text-green-400 dark:hover:text-white",
    icon: <ChevronDown size={11} />,
  },
  media: {
    label: "Média",
    strip: "bg-yellow-400",
    pill: "border-yellow-500/30 text-yellow-700 bg-yellow-400/10 hover:bg-yellow-400/10 dark:text-yellow-300 dark:border-yellow-400/30 dark:bg-yellow-400/10",
    btn: "border-yellow-500/40 text-yellow-700 bg-yellow-400/10 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 dark:text-yellow-300 dark:hover:text-white",
    icon: <Minus size={11} />,
  },
  alta: {
    label: "Alta",
    strip: "bg-orange-500",
    pill: "border-orange-500/30 text-orange-600 bg-orange-500/10 hover:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30 dark:bg-orange-500/10",
    btn: "border-orange-500/40 text-orange-700 bg-orange-500/10 hover:bg-orange-600 hover:text-white hover:border-orange-600 dark:text-orange-400 dark:hover:text-white",
    icon: <ChevronUp size={11} />,
  },
  urgente: {
    label: "Urgente",
    strip: "bg-rose-500",
    pill: "border-rose-500/30 text-rose-600 bg-rose-500/10 hover:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 dark:bg-rose-500/10",
    btn: "border-rose-500/40 text-rose-700 bg-rose-500/10 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:text-rose-400 dark:hover:text-white",
    icon: <AlertTriangle size={11} />,
  },
};

const statusMap: Record<string, { label: string; dot: string }> = {
  pendente: {
    label: "Pendente",
    dot: "bg-muted-foreground/40",
  },
  "em andamento": {
    label: "Em andamento",
    dot: "bg-blue-400 shadow-[0_0_0_3px_color-mix(in_oklch,theme(colors.blue.400)_20%,transparent)]",
  },
  concluido: {
    label: "Concluído",
    dot: "bg-green-500 shadow-[0_0_0_3px_color-mix(in_oklch,theme(colors.green.500)_20%,transparent)]",
  },
};

export const TaskCard = ({
  taskTitle,
  taskPriority,
  taskStatus,
  taskDueDate,
  taskHref,
}: TaskItemProps) => {
  const normalizedStatus = normalize(taskStatus) as unknown as string;
  const normalizedPriority = normalize(taskPriority) as unknown as string;

  const priority = priorityMap[normalizedPriority] ?? priorityMap["media"];
  const status = statusMap[normalizedStatus] ?? statusMap["pendente"];

  const isOverdue =
    taskDueDate &&
    normalizedStatus !== "concluido" &&
    new Date(taskDueDate) < new Date();

  return (
    // bg-card e border usa os tokens do tema — muda automaticamente light ↔ dark
    <Card className="border-border bg-card relative w-full gap-0 overflow-hidden rounded-2xl border py-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Left colored strip — cor semântica fixa por design */}
      <span
        className={cn(
          "absolute top-4 bottom-4 left-0 w-0.75 rounded-r-full",
          priority.strip,
        )}
      />

      {/* Header */}
      <CardHeader className="gap-0 pt-4 pr-4 pb-3 pl-5">
        {/* Top row: priority pill + status */}
        <div className="mb-3 flex items-center justify-between">
          {/* Priority badge */}
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
              "border font-mono text-[10px] font-medium tracking-wider uppercase",
              priority.pill,
            )}
          >
            {priority.icon}
            {priority.label}
          </Badge>

          {/* Status — texto usa muted-foreground do tema */}
          <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px]">
            <span
              className={cn("h-1.75 w-1.75 shrink-0 rounded-full", status.dot)}
            />
            {status.label}
          </div>
        </div>

        {/* Title — usa foreground do tema */}
        <h3 className="text-foreground text-[15px] leading-snug font-semibold tracking-tight">
          {taskTitle}
        </h3>
      </CardHeader>

      {/* Due date — border e texto usam tokens do tema */}
      {taskDueDate && (
        <CardContent
          className={cn(
            "border-border flex items-center gap-1.5 border-t py-2 pr-4 pl-5",
            "font-mono text-[11px]",
            // destructive é o token de erro do tema (vermelho em ambos os modos)
            isOverdue ? "text-destructive" : "text-muted-foreground",
          )}
        >
          <CalendarDays size={11} className="shrink-0" />
          {isOverdue && <span>Venceu&nbsp;·&nbsp;</span>}
          <DateFormat date={taskDueDate} />
        </CardContent>
      )}

      {/* Footer */}
      <CardFooter className="border-border flex justify-end border-t py-3 pr-4 pl-5">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 rounded-xl border text-[12px] font-medium",
            "transition-all duration-200 hover:scale-[1.03]",
            priority.btn,
          )}
          asChild
        >
          <Link href={taskHref}>
            Acessar tarefa
            <ArrowRight size={13} className="ml-1.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
