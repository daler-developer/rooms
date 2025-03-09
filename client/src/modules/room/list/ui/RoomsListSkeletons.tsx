import { Skeleton } from "@/shared/ui";
import { Scroll } from "@/shared/ui";

const RoomsListSkeletons = () => {
  return (
    <Scroll height="full">
      <div className="flex flex-col gap-2 p-2">
        {new Array(20).fill(null).map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Skeleton type="circular" size={50} />
            <div className="flex-grow flex flex-col gap-2 items-start">
              <Skeleton type="block" width={220} height={10} />
              <Skeleton type="block" width={80} height={10} />
            </div>
          </div>
        ))}
      </div>
    </Scroll>
  );
};

export default RoomsListSkeletons;
