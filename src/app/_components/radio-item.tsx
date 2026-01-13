import { Label } from "./ui/label";
import { RadioGroupItem } from "./ui/radio-group";

interface RadioItemProps {
    id: string
    value: string
    label: string
}

const RadioItem = ({ id, value, label }: RadioItemProps) => {
    return (
      <div className="flex flex-row gap-2">
        <RadioGroupItem value={value}  id={id} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    );
}
 
export default RadioItem;