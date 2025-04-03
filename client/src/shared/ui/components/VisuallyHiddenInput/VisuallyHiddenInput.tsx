import { ComponentProps } from "react";

type Props = ComponentProps<"input">;

const VisuallyHiddenInput = (props: Props) => {
  return <input hidden {...props} />;
};

export default VisuallyHiddenInput;
