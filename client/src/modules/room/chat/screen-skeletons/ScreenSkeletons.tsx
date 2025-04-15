import { useEffect } from "react";
import BaseScreen from "../base/BaseScreen.tsx";
import { Skeleton, Scroll, useScrollControl } from "@/shared/ui";
import BaseMessageSkeletons from "../base/BaseMessageSkeletons.tsx";

const ScreenSkeletons = () => {
  const scrollControl = useScrollControl();

  useEffect(() => {
    scrollControl.scrollToBottom();
  }, []);

  return (
    <BaseScreen
      header={
        <BaseScreen.Header
          left={
            <div className="flex items-center gap-2">
              <Skeleton type="circular" size={50} />

              <div className="flex flex-col gap-2 item-start">
                <Skeleton type="block" height={10} width={150} />
                <Skeleton type="block" height={10} width={80} />
              </div>
            </div>
          }
          right={
            <div className="flex items-center gap-2">
              <Skeleton type="block" height={20} width={100} />
              <Skeleton type="block" height={20} width={100} />
              <Skeleton type="block" height={20} width={100} />
            </div>
          }
        />
      }
      content={
        <BaseScreen.Content>
          <Scroll ref={scrollControl.ref} height="full" showScrollToBottomButton={false}>
            <div className="p-6">
              <BaseMessageSkeletons />
            </div>
          </Scroll>
        </BaseScreen.Content>
      }
    />
  );
};

export default ScreenSkeletons;
