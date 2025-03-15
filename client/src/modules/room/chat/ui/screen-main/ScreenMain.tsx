import BaseScreen from "../base/BaseScreen";
import ScreenMainHeader from "./screen-main-header/ScreenMainHeader";
import ScreenMainContent from "./screen-main-content/ScreenMainContent";
import ScreenMainFooter from "./screen-main-footer/ScreenMainFooter";

const ScreenMain = () => {
  return <BaseScreen header={<ScreenMainHeader />} content={<ScreenMainContent />} footer={<ScreenMainFooter />} />;
};

export default ScreenMain;
