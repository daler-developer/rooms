import BaseTab from "../base/BaseTab";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";

const TabMain = () => {
  return (
    <BaseTab>
      <Header />
      <Content />
      <Footer />
    </BaseTab>
  );
};

export default TabMain;
