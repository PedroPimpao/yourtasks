import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DateFormatProps {
    date: Date
}

const DateFormat = ({ date } : DateFormatProps) => {
  return (
    <div className="text-sm">
      <span className="capitalize">
        {format(date, "EEEE, ", { locale: ptBR })}
      </span>
      <span className="">
        {format(date, "d 'de' ", { locale: ptBR })}
      </span>
      <span className="capitalize">
        {format(date, "MMMM", { locale: ptBR })}
      </span>
    </div>
  );
};

export default DateFormat;
