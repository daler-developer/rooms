export type FormFields = {
  text: string;
  scheduleAt: string | null;
  images: Array<{
    key: string;
    fileObject: File;
    imageUrl: string | null;
    isLoading: boolean;
  }>;
};
