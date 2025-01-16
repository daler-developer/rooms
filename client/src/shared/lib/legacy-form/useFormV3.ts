import { ChangeEvent, createElement, Fragment, ReactNode, SyntheticEvent, useEffect, useRef, FormEvent } from "react";
import { Schema, ValidationError } from "yup";
import _ from "lodash";
import { flushSync } from "react-dom";
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

const useFormV3 = <TInitialValues>({ initialValues, validationSchema, onSubmit }: Options<TInitialValues>) => {
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
    handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const isValid = form.current.validate();

      if (isValid) {
        const values = form.current.constructValues();

        onSubmit?.(values);
        form.current.reset();
      } else {
        form.current.setIsLastSubmitFailed(true);
      }
    },
    appendArrayItem(...args) {
      form.current.appendArrayItem(...args);
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

export default useFormV3;
