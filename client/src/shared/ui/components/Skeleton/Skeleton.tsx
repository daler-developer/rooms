import clsx from "clsx";

type CommonProps = {};

type CircularSkeleton = CommonProps & {
  type: "circular";
  size?: number | "full";
};

type BlockSkeleton = CommonProps & {
  type: "block";
  height?: number;
  width?: number | "full";
};

type Props = CircularSkeleton | BlockSkeleton;

const Skeleton = (props: Props) => {
  if (props.type === "circular") {
    return (
      <div
        className={clsx("bg-gray-400 animate-pulse rounded-full")}
        style={{
          width: props.size === "full" ? "100%" : String(props.size || 60) + "px",
          height: props.size === "full" ? "100%" : String(props.size || 60) + "px",
        }}
      ></div>
    );
  }

  if (props.type === "block") {
    return (
      <div
        className={clsx("bg-gray-400 animate-pulse rounded-sm")}
        style={{
          height: String(props.height || 100) + "px",
          width: String(props.width || 100) + "px",
        }}
      ></div>
    );
  }
};

export default Skeleton;
