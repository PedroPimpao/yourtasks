import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";

interface SettingActionItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const SettingActionItem = ({
  title,
  description,
  icon,
  action,
}: SettingActionItemProps) => {
  return (
    <>
      <Item className="" variant={"outline"}>
        <ItemMedia variant="icon">{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
        <ItemActions>{action}</ItemActions>
      </Item>
    </>
  );
};

export default SettingActionItem;
