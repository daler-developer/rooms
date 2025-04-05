import clsx from "clsx";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Skeleton from "../Skeleton/Skeleton.tsx";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  className?: string;
  src?: string | null;
  size?: AvatarSize;
  badgeContent?: ReactNode;
  onClick?: () => void;
  children?: string;
  alt?: string;
};

const Avatar = forwardRef<HTMLDivElement, Props>(({ src, className, size = "lg", badgeContent, onClick, alt }, ref) => {
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

  const wrapperClasses = clsx(
    "inline-block relative",
    {
      "cursor-pointer": Boolean(onClick),

      "h-5 w-5": size === "xs",
      "h-[40px] w-[40px]": size === "sm",
      "h-[50px] w-[50px]": size === "md",
      "h-[110px] w-[110px]": size === "lg",
      "h-[150px] w-[150px]": size === "xl",
    },
    className,
  );

  const badgeContentWrapperClasses = clsx("absolute transform translate-x-1/2 translate-y-1/2", {
    "bottom-[0px] right-[1px]": size === "xs",
    "bottom-[5px] right-[6px]": size === "sm",
    "bottom-[8px] right-[8px]": size === "md",
    "bottom-[10px] right-[20px]": size === "lg",
    "bottom-[16px] right-[30px]": size === "xl",
  });

  const fallbackIconClasses = clsx("text-gray-500", {
    "text-[10px]": size === "xs",
    "text-[20px]": size === "sm",
    "text-[28px]": size === "md",
    "text-[55px]": size === "lg",
    "text-[70px]": size === "xl",
  });

  const fallbackTextClasses = clsx("text-gray-500 font-medium", {
    "text-[10px]": size === "xs",
    "text-[20px]": size === "sm",
    "text-[28px]": size === "md",
    "text-[55px]": size === "lg",
    "text-[70px]": size === "xl",
  });

  const skeletonSize = () => {
    const map: Record<AvatarSize, number> = {
      xs: 20,
      sm: 40,
      md: 50,
      lg: 110,
      xl: 120,
    };

    return map[size];
  };

  if (isLoading) {
    return <Skeleton type="circular" size={skeletonSize()} />;
  }

  return (
    <div ref={ref} className={wrapperClasses} onClick={onClick}>
      {hasError && (
        <>
          <div className="bg-gray-200 w-full h-full rounded-full overflow-hidden flex items-center justify-around">
            {alt ? <span className={fallbackTextClasses}>{alt[0].toUpperCase()}</span> : <FaUser className={fallbackIconClasses} />}
          </div>
        </>
      )}

      {!hasError && (
        <>
          <img className={clsx("object-cover object-center rounded-full")} alt={alt} src={src || undefined} />
        </>
      )}

      {badgeContent && <div className={badgeContentWrapperClasses}>{badgeContent}</div>}
    </div>
  );
});

export default Avatar;
