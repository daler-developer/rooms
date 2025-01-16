import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

type Props = {
  progress: number;
};

const Progress = ({ progress }: Props) => {
  const [styles, api] = useSpring(() => ({
    from: {
      width: String(progress) + "%",
    },
  }));

  useEffect(() => {
    if (progress > 100) {
      api.start({
        to: {
          width: "100%",
        },
      });
    } else if (progress < 0) {
      api.start({
        to: {
          width: "0%",
        },
      });
    } else {
      api.start({
        to: {
          width: String(progress) + "%",
        },
      });
    }
  }, [progress, api]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
      <animated.div className="bg-blue-600 h-2.5 rounded-full" style={{ ...styles }} />
    </div>
  );
};

export default Progress;
