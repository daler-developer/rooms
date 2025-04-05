import { ComponentProps, forwardRef } from "react";

type Props = ComponentProps<"input">;

const VisuallyHiddenInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} hidden {...props} />;
});

export default VisuallyHiddenInput;
