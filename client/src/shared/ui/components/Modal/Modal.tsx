import { cloneElement, ReactElement, ReactNode, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { HiMiniXMark } from "react-icons/hi2";
import classnames from "@/shared/lib/classnames";
import { Portal } from "@/shared/ui";
import { useIsFirstRender } from "@/shared/hooks";
import clsx from "clsx";

export type ModalActions = ReactElement[];

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  actions?: ModalActions;
  title?: string;
  withCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: "sm" | "md" | "lg";
};

const Modal = ({ isOpen, onClose, actions, children, title, size = "md", withCloseButton = true, closeOnOverlayClick = true }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const isFirstRender = useIsFirstRender();

  const [modalSprings, modalSpringsApi] = useSpring(() => ({
    from: { top: isOpen ? 0 : -50 },
  }));

  const [overlaySprings, overlaySpringsApi] = useSpring(() => ({
    from: {
      opacity: isOpen ? 1 : 0,
    },
  }));

  // useEffect(() => {
  //   if (isFirstRender) {
  //     return;
  //   }
  //
  //   if (isOpen) {
  //     modalSpringsApi.start({
  //       from: {
  //         top: -50,
  //       },
  //       to: {
  //         top: 0,
  //       },
  //     });
  //
  //     overlaySpringsApi.start({
  //       from: {
  //         opacity: 0,
  //       },
  //       to: {
  //         opacity: 1,
  //       },
  //     });
  //   } else {
  //     setIsClosing(true);
  //
  //     modalSpringsApi.start({
  //       from: {
  //         top: 0,
  //       },
  //       to: {
  //         top: -50,
  //       },
  //       onResolve() {
  //         setIsClosing(false);
  //       },
  //     });
  //
  //     overlaySpringsApi.start({
  //       from: {
  //         opacity: 1,
  //       },
  //       to: {
  //         opacity: 0,
  //       },
  //     });
  //   }
  // }, [isOpen]);

  const withTitle = Boolean(title);

  const showHeader = withTitle || withCloseButton;

  const showFooter = Boolean(actions?.length);

  const modalClasses = classnames("relative p-4 w-full max-h-full", {
    "max-w-md": size === "sm",
    "max-w-2xl": size === "md",
    "max-w-3xl": size === "lg",
  });

  return (
    <Portal to={document.body}>
      <div
        className={clsx(
          "overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-[1001]",
          {
            invisible: !isOpen,
          },
        )}
        onClick={() => closeOnOverlayClick && onClose?.()}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {showHeader && (
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                {withTitle && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>}
                {withCloseButton && (
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => onClose?.()}
                  >
                    <HiMiniXMark className="text-2xl" />
                    <span className="sr-only">Close modal</span>
                  </button>
                )}
              </div>
            )}

            <div className="p-4 md:p-5 space-y-4">{children}</div>

            {showFooter && (
              <div className="flex items-center justify-end gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                {actions!.map((action, index) => cloneElement(action, { key: index }))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
