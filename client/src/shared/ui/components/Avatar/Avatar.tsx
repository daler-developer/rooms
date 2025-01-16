import clsx from "clsx";
import { ComponentProps, forwardRef, ReactNode, useEffect, useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

import Skeleton from "../Skeleton/Skeleton.tsx";
import IconButton from "../IconButton/IconButton.tsx";

import Dropdown, { type DropdownItem } from "../Dropdown/Dropdown.tsx";
import { Badge, BadgeColor } from "@/shared/ui";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarActions = DropdownItem[];

type Props = ComponentProps<"img"> & {
  status?: "online" | "offline";
  size?: AvatarSize;
  actions?: AvatarActions;
  withBadge?: boolean;
  badgeColor?: BadgeColor;
  badgeContent?: ReactNode;
};

const Avatar = forwardRef(({ src, className, alt, actions, status, size = "lg", withBadge, badgeColor, badgeContent, ...restProps }: Props, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = src || "";

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    return () => {
      setHasError(false);
    };
  }, [src]);

  const withStatus = Boolean(status);

  const wrapperClasses = clsx(
    "inline-block relative",
    {
      "cursor-pointer": Boolean(restProps.onClick),

      "h-5 w-5": size === "xs",
      "h-[40px] w-[40px]": size === "sm",
      "h-[50px] w-[50px]": size === "md",
      "h-[110px] w-[110px]": size === "lg",
      "h-[150px] w-[150px]": size === "xl",
    },
    className,
  );

  const badgeClasses = clsx("absolute bottom-[0px] right-[0px]");

  const actionsTriggerClasses = clsx("absolute", {
    "bottom-[-5px] right-[-5px]": size === "lg",
  });

  const badgeContentWrapperClasses = clsx("absolute transform translate-x-1/2 translate-y-1/2", {
    "bottom-[15px] right-[15px]": true,
  });

  const actionsEl = (
    <Dropdown
      items={actions!}
      trigger={
        <div className={actionsTriggerClasses}>
          <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
        </div>
      }
    />
  );

  const skeletonSize = () => {
    const map: Record<AvatarSize, number> = {
      xs: 20,
      sm: 40,
      md: 50,
      lg: 110,
    };

    return map[size];
  };

  if (isLoading) {
    return <Skeleton type="circular" size={skeletonSize()} />;
  }

  return (
    <div className={wrapperClasses} ref={ref}>
      {hasError && (
        <>
          <div className="bg-gray-100 w-full h-full rounded-full overflow-hidden">
            <svg className="w-full h-full text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
        </>
      )}

      {!hasError && (
        <>
          <img className={clsx("object-cover object-center rounded-full")} alt={alt} src={src} {...restProps} />
        </>
      )}

      {badgeContent && <div className={badgeContentWrapperClasses}>{badgeContent}</div>}

      {/*{actions && actionsEl}*/}

      {/*{withBadge && <Badge className={badgeClasses} badgeColor={badgeColor} />}*/}
    </div>
  );
});

export default Avatar;
