import { useEffect } from "react";

type Handler = () => void;

type Options = {
  [key: string]:
    | Handler
    | {
        event: "keyup" | "keydown" | "keypress";
        handler: Handler;
      };
};

const defaultEvent = "keyup";

const useKeyboard = (options: Options) => {
  useEffect(() => {
    const controller = new AbortController();

    const eventNames = ["keyup", "keypress", "keydown"] as const;

    eventNames.forEach((eventName) => {
      document.addEventListener(
        eventName,
        (e) => {
          Object.entries(options).forEach((entry) => {
            const codes = entry[0].split(",");

            if (codes.includes(e.code)) {
              if (typeof entry[1] === "function") {
                if (eventName === defaultEvent) {
                  entry[1]();
                }
              } else {
                if (entry[1].event === eventName) {
                  entry[1].handler();
                }
              }
            }
          });
        },
        { signal: controller.signal },
      );
    });

    return () => {
      controller.abort();
    };
  }, [options]);
};

export default useKeyboard;
