import { Skeleton } from "@/shared/ui";

const InvitationsListSkeletons = () => {
  return (
    <div className="flex flex-col">
      {new Array(20).fill(null).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 p-[10px] border-b border-b-gray-200">
          <Skeleton type="circular" size={50} />
          <Skeleton type="block" height={15} width={200} />
          <Skeleton type="block" height={15} width={300} />
          <Skeleton type="block" height={15} width={100} />
        </div>
      ))}
    </div>
  );
};

export default InvitationsListSkeletons;
