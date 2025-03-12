import cls from "@/shared/lib/classnames";

type Props = {
  position: "top" | "left" | "bottom" | "right";
};

const ScrollHint = ({ position }: Props) => {
  return (
    <div
      className={cls(`z-[2] from-white to-transparent pointer-events-none`, {
        "bg-gradient-to-b absolute top-0 left-0 right-0 h-[20px]": position === "top",
        "bg-gradient-to-l absolute right-0 top-0 bottom-0 w-[20px]": position === "right",
        "bg-gradient-to-t absolute bottom-0 left-0 right-0 h-[20px]": position === "bottom",
        "bg-gradient-to-r absolute left-0 top-0 bottom-0 w-[20px]": position === "left",
      })}
    />
  );
};

export default ScrollHint;
