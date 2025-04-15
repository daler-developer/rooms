import { Skeleton } from "@/shared/ui";
import { arrayGetRandomElement, getRandomNumber } from "@/shared/lib/utils";
import { useState } from "react";
import clsx from "clsx";

const BaseMessageSkeleton = () => {
  const [alignment] = useState(() => arrayGetRandomElement(["left", "right"] as const));
  const [width] = useState(() => getRandomNumber(250, 350));
  const [height] = useState(() => getRandomNumber(70, 120));

  return (
    <div
      className={clsx("flex items-start justify-start gap-2", {
        "flex-row": alignment === "left",
        "flex-row-reverse": alignment === "right",
      })}
    >
      <div className="w-[50px] h-[50px] shrink-0">
        <Skeleton type="circular" size={"full"} />
      </div>
      <Skeleton type="block" height={height} width={width} />
    </div>
  );
};

export default BaseMessageSkeleton;
