import { forwardRef, useImperativeHandle, useState, ComponentProps, EventHandler, MouseEvent, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";

import { Button, Modal, Slider } from "@/shared/ui";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PICTURE } from "./gql/tags.ts";

type Props = {
  title?: ComponentProps<typeof Modal>["title"];
};

const ProfilePictureCropperModal = forwardRef(({ title }: Props, ref) => {
  const [uploadProfilePictureMutate, { loading: isUploadingProfilePictureMutating }] = useMutation(UPLOAD_PROFILE_PICTURE);

  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [relativeCursorPosition, setRelativeCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [draggableCoords, setDraggableCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 200,
  });

  const draggableInitialCoords = useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const resolveFunc = useRef(null!);

  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        setImageUrl(e.target.result);
      };

      fileReader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    setDraggableCoords((prev) => {
      const width = draggableInitialCoords.current.width * zoom;
      const height = draggableInitialCoords.current.height * zoom;
      const left = rootEl.current.getBoundingClientRect().width / 2 - width / 2;
      const top = rootEl.current.getBoundingClientRect().height / 2 - height / 2;

      return {
        ...prev,
        width,
        height,
        left,
        top,
      };
    });
  }, [zoom, showModal]);

  useEffect(() => {
    if (isDragging) {
      setCloseOnOverlayClick(false);
    } else {
      setCloseOnOverlayClick(true);
    }
  }, [isDragging]);

  useLayoutEffect(() => {
    const initDraggableElCoords = () => {
      const image = new Image();

      image.src = imageUrl!;

      image.onload = () => {
        const top = 0;
        const height = 200;
        const width = (height * image.naturalWidth) / image.naturalHeight;
        const left = rootEl.current.getBoundingClientRect().width / 2 - width / 2;

        draggableInitialCoords.current = {
          width,
          height,
          top,
          left,
        };

        setDraggableCoords((prev) => {
          return {
            ...prev,
            top,
            left,
            height,
            width,
          };
        });
      };
    };

    if (imageUrl && showModal) {
      initDraggableElCoords();
    }
  }, [imageUrl, showModal]);

  const rootEl = useRef<HTMLDivElement>(null!);
  const cropBoxEl = useRef<HTMLDivElement>(null!);
  const draggableEl = useRef<HTMLDivElement>(null!);

  useImperativeHandle(ref, () => {
    return {
      open(_image: File) {
        setShowModal(true);
        setImage(_image);

        return new Promise((res) => {
          resolveFunc.current = res;
        });
      },
    };
  });

  useEffect(() => {
    const handleMouseMove: EventHandler<MouseEvent> = (e) => {
      setDraggableCoords((prev) => {
        let left = e.clientX - rootEl.current.getBoundingClientRect().left - relativeCursorPosition.x;

        if (left > cropBoxEl.current.getBoundingClientRect().left - rootEl.current.getBoundingClientRect().left) {
          left = cropBoxEl.current.getBoundingClientRect().left - rootEl.current.getBoundingClientRect().left;
        }

        if (
          left + draggableEl.current.getBoundingClientRect().width <
          cropBoxEl.current.getBoundingClientRect().right - rootEl.current.getBoundingClientRect().left
        ) {
          left =
            cropBoxEl.current.getBoundingClientRect().right - rootEl.current.getBoundingClientRect().left - draggableEl.current.getBoundingClientRect().width;
        }

        let top = e.clientY - rootEl.current.getBoundingClientRect().top - relativeCursorPosition.y;

        if (top > cropBoxEl.current.getBoundingClientRect().top - rootEl.current.getBoundingClientRect().top) {
          top = cropBoxEl.current.getBoundingClientRect().top - rootEl.current.getBoundingClientRect().top;
        }

        if (
          top + draggableEl.current.getBoundingClientRect().height <
          cropBoxEl.current.getBoundingClientRect().bottom - rootEl.current.getBoundingClientRect().top
        ) {
          top =
            cropBoxEl.current.getBoundingClientRect().bottom - rootEl.current.getBoundingClientRect().top - draggableEl.current.getBoundingClientRect().height;
        }

        return {
          ...prev,
          left,
          top,
        };
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging && showModal) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, showModal]);

  const handleDraggableMouseDown: EventHandler<MouseEvent> = (e) => {
    setIsDragging(true);

    setRelativeCursorPosition({
      x: e.clientX - draggableEl.current.getBoundingClientRect().left,
      y: e.clientY - draggableEl.current.getBoundingClientRect().top,
    });
  };

  const handleUpload = () => {
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d")!;

      canvas.width = cropBoxEl.current.getBoundingClientRect().width;
      canvas.height = cropBoxEl.current.getBoundingClientRect().height;

      const cropX =
        (image.naturalWidth / 100) *
        (((cropBoxEl.current.getBoundingClientRect().left - draggableEl.current.getBoundingClientRect().left) /
          draggableEl.current.getBoundingClientRect().width) *
          100);

      const cropY =
        (image.naturalHeight / 100) *
        (((cropBoxEl.current.getBoundingClientRect().top - draggableEl.current.getBoundingClientRect().top) /
          draggableEl.current.getBoundingClientRect().height) *
          100);

      const cropWidth =
        (image.naturalWidth / 100) * (cropBoxEl.current.getBoundingClientRect().width / draggableEl.current.getBoundingClientRect().width) * 100;

      const cropHeight =
        (image.naturalHeight / 100) * (cropBoxEl.current.getBoundingClientRect().height / draggableEl.current.getBoundingClientRect().height) * 100;

      ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const croppedImageFile = new File([blob!], "image.png", { type: "image/png" });

        resolveFunc.current(croppedImageFile);
      });

      canvas.remove();
    };
  };

  const handleCancel = () => {
    setShowModal(false);
    resolveFunc.current(null);
  };

  const modalActions = [
    <Button type="button" color="light" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button type="button" onClick={handleUpload}>
      Upload
    </Button>,
  ];

  return (
    <>
      <Modal size="lg" title={title} isOpen={showModal} onClose={() => setShowModal(false)} closeOnOverlayClick={closeOnOverlayClick} actions={modalActions}>
        <div>
          <div ref={rootEl} className="relative border w-full h-[200px] overflow-hidden">
            <div
              ref={draggableEl}
              className="absolute top-0 left-0 bottom-0 w-[2000px]"
              style={{
                top: draggableCoords.top + "px",
                left: draggableCoords.left + "px",
                height: draggableCoords.height + "px",
                width: draggableCoords.width + "px",
              }}
              onMouseDown={handleDraggableMouseDown}
            >
              <img src={imageUrl} className="h-full w-full select-none" alt="image" draggable={false} />
            </div>

            <div
              ref={cropBoxEl}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 aspect-square h-full rounded-full border-2 border-blue-500 bg-transparent pointer-events-none"
            />
          </div>
          <div className="mt-[30px]">
            <Slider StartIcon={HiMiniMinus} EndIcon={HiMiniPlus} value={zoom} onChange={(value) => setZoom(value)} min={1} max={5} step={0.01} />
          </div>
        </div>
      </Modal>
    </>
  );
});

export default ProfilePictureCropperModal;
