import BaseMessageSkeleton from "./BaseMessageSkeleton";

const BaseMessageSkeletons = () => {
  return (
    <div className="flex flex-col gap-2">
      {new Array(50).fill(null).map((_, i) => (
        <BaseMessageSkeleton key={i} />
      ))}
    </div>
  );
};

export default BaseMessageSkeletons;
