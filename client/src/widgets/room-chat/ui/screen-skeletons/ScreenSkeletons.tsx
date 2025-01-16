import BaseScreen from "../base/BaseScreen";
import BaseScreenHeader from "../base/BaseScreenHeader";
import BaseScreenContent from "../base/BaseScreenContent.tsx";
import BaseScreenFooter from "../base/BaseScreenFooter.tsx";
import { Skeleton } from "@/shared/ui";
import BaseMessageSkeletons from "../base/BaseMessageSkeletons";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";
import { useScrollControl } from "@/shared/ui";
import { useEffect } from "react";

const ScreenSkeletons = () => {
  const scrollControl = useScrollControl();

  useEffect(() => {
    scrollControl.scrollToBottom();
  }, []);

  return (
    <BaseScreen
      header={
        <BaseScreenHeader
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
        <BaseScreenContent>
          <Scroll ref={scrollControl.ref} height="full" showScrollToBottomButton={false}>
            <div className="p-6">
              <BaseMessageSkeletons />
            </div>
          </Scroll>
        </BaseScreenContent>
      }
    />
  );
};

export default ScreenSkeletons;
