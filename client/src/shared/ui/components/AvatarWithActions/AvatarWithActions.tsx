import Avatar from "../Avatar/Avatar";
import { ComponentProps } from "react";
import IconButton from "../IconButton/IconButton.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Dropdown from "../Dropdown/Dropdown.tsx";
import clsx from "clsx";

type AvatarAction = {
  label: string;
  onClick?: () => void;
};

type Props = Exclude<ComponentProps<typeof Avatar>, "actions" | "badgeColor" | "withBadge"> & {
  actions: AvatarAction;
};

const AvatarWithActions = ({ actions, ...restProps }: Props) => {
  const triggerClasses = clsx("absolute bottom-[-5px] right-[-5px]");

  return (
    <div className="relative inline-block">
      <Avatar {...restProps} />

      <Dropdown
        placement="bottom-right"
        items={actions}
        trigger={
          <div className={triggerClasses}>
            <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
          </div>
        }
      />
    </div>
  );
};

export default AvatarWithActions;
