import type { Message } from "@/__generated__/graphql.ts";
import { HiOutlineEye } from "react-icons/hi2";
import { Popover, Spinner } from "@/shared/ui";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGE_VIEWERS, MESSAGE_VIEWED_SUB } from "@/widgets/room-chat/gql/tags.ts";
import MessageViewer from "@/widgets/room-chat/ui/Message/MessageViewer.tsx";
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  message: Pick<Message, "id" | "text" | "images" | "viewsCount" | "isViewedByMe"> & { sender: Pick<Message["sender"], "id" | "email" | "profilePictureUrl"> };
};

const MessageViews = ({ message, trigger }: Props) => {
  const [getMessageViewers, { loading: isLoadingMessageViewers, data: messageViewersData }] = useLazyQuery(GET_MESSAGE_VIEWERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      messageId: message.id,
    },
    onError() {
      localStorage.removeItem("token");
    },
  });

  useSubscription(MESSAGE_VIEWED_SUB, {
    variables: {
      messageId: message.id,
    },
    onData({ data, client }) {
      client.cache.modify({
        id: client.cache.identify(message),
        fields: {
          viewers(oldViewers) {
            if (oldViewers) {
              return [...oldViewers, data.data!.messageViewed.viewer];
            }

            return [];
          },
        },
      });
    },
  });

  const handlePopupOpen = () => {
    getMessageViewers();
  };

  return (
    <Popover width={300} offset={0} openTrigger="hover" trigger={trigger} onOpen={handlePopupOpen}>
      <div>
        {isLoadingMessageViewers && (
          <div className="flex items-center justify-center border border-gray-200 bg-white text-black shadow-lg p-[10px] rounded-md">
            {isLoadingMessageViewers && <Spinner />}
          </div>
        )}

        {!isLoadingMessageViewers && messageViewersData && (
          <div className="border border-gray-200 bg-white text-black shadow-lg p-[10px] rounded-md">
            {messageViewersData.message.viewers.length ? (
              <ul className="flex flex-col gap-1">
                {messageViewersData.message.viewers.map((viewer) => (
                  <MessageViewer key={viewer.id} viewer={viewer} />
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center">No viewers</div>
            )}
          </div>
        )}
      </div>
    </Popover>
  );
};

export default MessageViews;
