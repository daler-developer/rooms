import { Button, IconButton, Textarea } from "@chakra-ui/react";
import * as yup from "yup";
import { ChangeEvent, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import UploadedImages from "./UploadedImages";

export type Inputs = {
  images: Array<File>;
};

const validationSchema = yup.object({
  images: yup.mixed().required(),
});

const CreatePostForm = () => {
  const form = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      images: [],
    },
  });

  // const {} = useFieldArray({ control: form.control, name: "images" });

  const handleSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Textarea placeholder="Text" />
          <UploadedImages />
        </form>
      </FormProvider>
    </>
  );
};

export default CreatePostForm;
