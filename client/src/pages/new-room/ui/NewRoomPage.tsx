import { CreateRoomForm } from "@/features/create-room";
import { RoomInviteMembersForm } from "@/features/room-invite-members";

const NewRoomPage = () => {
  return (
    <div className="p-6">
      <CreateRoomForm />
    </div>
  );
};

export default NewRoomPage;
