import clsx from "clsx";

export type BadgeColor = "gray" | "green" | "blue";

export type BadgeSize = "sm" | "md" | "lg";

type Props = {
  badgeContent?: string | number;
  badgeColor?: BadgeColor;
  size?: BadgeSize;
  className?: string;
};

const Badge = ({ badgeContent, badgeColor, size = "md", className }: Props) => {
  const isBadgeContentEmpty = badgeContent === undefined || badgeContent === null || badgeContent === "";

  const rootClasses = clsx(
    "text-[10px] font-bold",
    {
      "w-[10px] h-[10px] rounded-full": isBadgeContentEmpty,
      "px-[5px] py-[3px] text-white rounded-sm": !isBadgeContentEmpty,
      "bg-green-600": badgeColor === "green",
      "bg-gray-600": badgeColor === "gray",
      "bg-blue-600": badgeColor === "blue",
    },
    className,
  );

  return <div className={rootClasses}>{badgeContent}</div>;
};

export default Badge;
