import { ChangeEvent, createElement, Fragment, useRef, FormEvent, ComponentProps, SyntheticEvent } from "react";
import { Schema } from "yup";
import { useForceUpdate } from "@/shared/hooks";
import Form from "./Form";

type Options<TInitialValues> = {
  initialValues: TInitialValues;
  validationSchema: Schema;
  onSubmit: (values: TInitialValues) => void | Promise<void>;
  resetAfterSubmit?: boolean;
};

export type UseForm = {
  getErrors(path: string): string[];
};

const useForm = <TInitialValues>({ initialValues, validationSchema, onSubmit, resetAfterSubmit }: Options<TInitialValues>) => {
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
    isEdited(path?: string) {
      return form.current.getIsEdited(path);
    },
    isSubmitting: form.current.getIsSubmitting(),
    async handleSubmit(e: FormEvent<HTMLFormElement>) {
      try {
        e.preventDefault();

        const isValid = form.current.validate();

        if (isValid) {
          const values = form.current.constructValues();
          form.current.setIsSubmitting(true);
          await onSubmit?.(values);
          if (resetAfterSubmit) {
            form.current.reset();
          }
        } else {
          form.current.setIsLastSubmitFailed(true);
        }
      } finally {
        form.current.setIsSubmitting(false);
      }
    },
    setInitialValues(initialValues: TInitialValues) {
      form.current.setInitialValues(initialValues);
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
        getFieldProps(restProps: ComponentProps<"input"> = {}) {
          return {
            value: form.current.getValue(path),
            onChange(e: ChangeEvent<HTMLInputElement>) {
              const value = e.target.value;
              form.current.setValue(path, value);
              if (form.current.getIsLastSubmitFailed()) {
                form.current.validate();
              }
              restProps.onChange?.(e);
            },
            onBlur(e: SyntheticEvent<HTMLInputElement>) {
              form.current.setIsTouched(path, true);
              restProps.onBlur?.(e);
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
