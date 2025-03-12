import { Skeleton } from "@/shared/ui";

const UserCardSkeletons = () => {
  return (
    <div className="flex flex-col gap-2">
      {new Array(15).fill(null).map((_, i) => (
        <div key={i} className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton type="circular" size={50} />
            <div className="flex gap-2">
              <Skeleton type="block" width={70} height={10} />
              <Skeleton type="block" width={70} height={10} />
            </div>
          </div>
          <div>
            <Skeleton type="circular" size={30} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardSkeletons;
