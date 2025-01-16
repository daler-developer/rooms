import { type MessageImage } from "@/__generated__/graphql.ts";
import { CSSProperties, useMemo } from "react";

type Props = {
  images: Array<Pick<MessageImage, "id" | "url">>;
};

const MessageImages = ({ images }: Props) => {
  const count = 8;

  const rootElStyles = useMemo(() => {
    const imagesLengthToCols = {
      1: 1,
      2: 2,
      3: 2,
      4: 3,
      5: 2,
    };
    const imagesLengthToRows = {
      1: 1,
      2: 2,
      3: 2,
      4: 3,
      5: 1,
    };

    const result: CSSProperties = {
      display: "grid",
      gridTemplateColumns: `repeat(${imagesLengthToCols[count]}, 1fr)`,
    };

    return result;
  });

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-rows-[100px] grid-cols-[100px] gap-2 grid-flow-col auto-cols-[100px]">
      {images.map((image) => (
        <div key={image.id}>
          <img className="w-full h-full" src={image.url} alt="test" />
        </div>
      ))}
    </div>
  );
};

export default MessageImages;
