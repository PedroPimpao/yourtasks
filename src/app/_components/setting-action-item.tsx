"use client"

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
  type?: "normal" | "danger"
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const SettingActionItem = ({
  title,
  description,
  icon,
  action,
  type
}: SettingActionItemProps) => {
  return (
    <>
      <Item className={type === "danger" ? "border-red-400 border-2" : ""} variant={"outline"}>
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
