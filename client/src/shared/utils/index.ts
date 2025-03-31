export const isAcceptedFile = (file: File, accept: string): boolean => {
  const acceptItems = accept.split(",").map((item) => item.trim());

  const fileName = file.name.toLowerCase();
  const mimeType = file.type;

  return acceptItems.some((accepted) => {
    if (accepted.startsWith(".")) {
      return fileName.endsWith(accepted.toLowerCase());
    } else if (accepted.endsWith("/*")) {
      const baseType = accepted.split("/")[0];
      return mimeType.startsWith(baseType + "/");
    } else {
      return mimeType === accepted;
    }
  });
};
