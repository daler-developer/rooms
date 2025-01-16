import { ComponentProps } from "react";

export const fileMatchesAccept = (file: File, accept?: ComponentProps<"input">["accept"]) => {
  if (!accept) {
    return true;
  }

  const list = accept
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean);

  return list.some((type) => {
    const isFileExtension = type.startsWith(".");
    const isWildcard = type.endsWith("/*");

    if (isFileExtension) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    } else if (isWildcard) {
      const baseType = type.slice(0, -2);
      return file.type.startsWith(baseType);
    } else {
      return file.type === type;
    }
  });
};
