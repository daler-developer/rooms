import { HiXMark } from "react-icons/hi2";

import cls from "@/shared/lib/classnames";

import Avatar from "../Avatar/Avatar.tsx";
import button from "@/shared/ui/components/Button/Button.tsx";

export type ChipColor = "blue" | "red" | "green" | "amber" | "purple";

type CommonProps = {
  onDelete?: () => void;
  text: string;
  color?: ChipColor;
};

type ChipWithAvatar = CommonProps & {
  withAvatar: true;
  avatar?: string | null;
};

type ChipWithoutAvatar = CommonProps & {
  withAvatar: false;
};

type Props = ChipWithAvatar | ChipWithoutAvatar;

const Chip = (props: Props) => {
  const rootClasses = cls("flex items-center gap-1 select-none rounded-full py-1 px-1.5 text-xs leading-none text-white font-bold", {
    "bg-blue-500": props.color === "blue",
    "bg-red-500": props.color === "red",
    "bg-green-500": props.color === "green",
    "bg-amber-500": props.color === "amber",
    "bg-purple-500": props.color === "purple",
  });

  return (
    <div className={rootClasses}>
      {props.withAvatar && <Avatar size="xs" src={props.avatar} />}
      <div>
        <p className="block text-sm leading-none text-white">{props.text}</p>
      </div>
      {props.onDelete && (
        <button type="button" onClick={() => props.onDelete!()}>
          <HiXMark className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default Chip;
