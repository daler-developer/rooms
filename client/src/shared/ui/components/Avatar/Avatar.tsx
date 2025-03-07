import clsx from "clsx";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton.tsx";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  alt?: string;
  className?: string;
  src?: string | null;
  size?: AvatarSize;
  badgeContent?: ReactNode;
  onClick?: () => void;
};

const Avatar = forwardRef<HTMLDivElement, Props>(({ src, className, alt, size = "lg", badgeContent, onClick }, ref) => {
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
    "bottom-[15px] right-[15px]": size === "md",
    "bottom-[5px] right-[5px]": size === "sm",
    "bottom-[16px] right-[30px]": size === "xl",
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
          <img className={clsx("object-cover object-center rounded-full")} alt={alt} src={src || undefined} />
        </>
      )}

      {badgeContent && <div className={badgeContentWrapperClasses}>{badgeContent}</div>}
    </div>
  );
});

export default Avatar;
