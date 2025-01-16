import { useEffect, useRef, useState } from "react";

const useIsDragging = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const counter = useRef(0);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      // e.stopPropagation();
      counter.current++;
      setIsDragging(true);
      const hasDraggingFiles = e.dataTransfer?.types && Array.from(e.dataTransfer.types).includes("Files");

      if (hasDraggingFiles) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // e.stopPropagation();
      counter.current--;
      if (counter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      // e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      // e.stopPropagation();
      counter.current--;
      setIsDragging(false);
    };

    document.addEventListener("dragenter", handleDragEnter, { capture: true });
    document.addEventListener("dragleave", handleDragLeave, { capture: true });
    document.addEventListener("dragover", handleDragOver, { capture: true });
    document.addEventListener("drop", handleDrop, { capture: true });

    return () => {
      document.removeEventListener("dragenter", handleDragEnter, { capture: false });
      document.removeEventListener("dragleave", handleDragLeave, { capture: false });
      document.removeEventListener("dragover", handleDragOver, { capture: false });
      document.removeEventListener("drop", handleDrop, { capture: false });
    };
  }, []);

  return isDragging;
};

export default useIsDragging;
