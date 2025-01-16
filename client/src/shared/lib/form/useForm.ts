import { ChangeEvent, createElement, Fragment, useRef, FormEvent } from "react";
import { Schema } from "yup";
import { useForceUpdate } from "@/shared/hooks";
import Form from "./Form";

type Options<TInitialValues> = {
  initialValues: TInitialValues;
  validationSchema: Schema;
  onSubmit: (values: TInitialValues) => void | Promise<void>;
};

export type UseForm = {
  getErrors(path: string): string[];
};

const useForm = <TInitialValues>({ initialValues, validationSchema, onSubmit }: Options<TInitialValues>) => {
  const forceUpdate = useForceUpdate();

  const form = useRef<Form>(null!);

  if (form.current === null) {
    form.current = new Form({
      initialValues,
      validationSchema,
      onStateUpdated() {
        forceUpdate();
      },
    });
  }

  return {
    isSubmitting: form.current.getIsSubmitting(),
    async handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const isValid = form.current.validate();

      if (isValid) {
        const values = form.current.constructValues();

        form.current.setIsSubmitting(true);
        await onSubmit?.(values);
        form.current.reset();
        form.current.setIsSubmitting(false);
      } else {
        form.current.setIsLastSubmitFailed(true);
      }
    },
    reset() {
      form.current.reset();
    },
    getValue(path: string) {
      return form.current.getValue(path);
    },
    setValue(path: string, value: unknown) {
      form.current.setValue(path, value);
    },
    validate(path?: string) {
      return form.current.validate(path);
    },
    appendArrayItem(...args) {
      form.current.appendArrayItem(...args);
    },
    removeArrayItem(path: string, at: number) {
      form.current.removeArrayFieldAt(path, at);
    },
    findArrayItemIndex(path: string, callback: any) {
      const arrayValue = form.current.getValue(path);

      for (let i = 0; i < arrayValue.length; i++) {
        if (callback(arrayValue[i])) {
          return i;
        }
      }

      return -1;
    },
    runValidationOnChange(path: string) {
      form.current.setShouldValidateOnChange(path, true);
    },
    stopValidationOnChange(path: string) {
      form.current.setShouldValidateOnChange(path, false);
    },
    renderField(path: string, callback: any) {
      const errors = form.current.getValidationErrors(path);

      return callback({
        getFieldProps() {
          return {
            value: form.current.getValue(path),
            onChange(e: ChangeEvent<HTMLInputElement>) {
              const value = e.target.value;
              form.current.setValue(path, value);
              if (form.current.getIsLastSubmitFailed()) {
                form.current.validate();
              }
            },
            onBlur() {
              form.current.setIsTouched(path, true);
            },
          };
        },
        errors,
        hasErrors: errors.length > 0,
      });
    },
    renderArray(basePath: string, callback: any, { generateKey }: { generateKey: any }) {
      const arrayLength = form.current.getArrayLength(basePath);

      const result: any = [];

      for (let i = 0; i < arrayLength; i++) {
        const finalPath = `${basePath}.${i}`;

        const el = callback({
          index: i,
          remove() {
            form.current.removeArrayFieldAt(basePath, i);
          },
        });

        result.push(createElement(Fragment, { key: generateKey({ index: i, value: form.current.getValue(finalPath) }), children: el }));
      }

      return result;
    },
  };
};

export default useForm;
