import { ChangeEvent, createElement, Fragment, useRef, FormEvent, ReactNode, FocusEventHandler } from "react";
import { Schema } from "yup";
import { useForceUpdate } from "@/shared/hooks";
import Form from "./Form";
import { NestedPaths, PathValue } from "./types";

type UseFormOptions<TValues> = {
  initialValues: TValues;
  validationSchema: Schema;
  onSubmit: (values: TValues) => void | Promise<void>;
  resetAfterSubmit?: boolean;
};

type RenderFieldsRestProps = {
  onChange?(e: ChangeEvent<HTMLInputElement>, options: { isValid: boolean }): void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

type RenderFieldCallback<TValues, TPath extends NestedPaths<TValues>> = (options: {
  errors: string[];
  hasErrors: boolean;
  getFieldProps: (restProps?: RenderFieldsRestProps) => {
    value: PathValue<TValues, TPath>;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    onBlur: FocusEventHandler<HTMLInputElement>;
  };
}) => ReactNode;

type RenderArrayCallback = (options: { index: number; remove: () => void }) => ReactNode;

type RenderArrayOptions<TValues, TPath extends NestedPaths<TValues>> = {
  generateKey: (arg: { index: number; value: PathValue<TValues, TPath> }) => string | number;
};

const useForm = <TValues extends { [key: string]: any }>({ initialValues, validationSchema, onSubmit, resetAfterSubmit }: UseFormOptions<TValues>) => {
  const forceUpdate = useForceUpdate();

  const form = useRef<Form<TValues>>(null!);

  if (form.current === null) {
    form.current = new Form<TValues>({
      initialValues,
      validationSchema,
      onStateUpdated() {
        forceUpdate();
      },
    });
  }

  return {
    isEdited: form.current.getIsEdited.bind(form.current),
    isDirty: form.current.getIsDirty.bind(form.current),
    isSubmitting: form.current.getIsSubmitting.call(form.current),
    setInitialValues: form.current.setInitialValues.bind(form.current),
    reset: form.current.reset.bind(form.current),
    getValue: form.current.getValue.bind(form.current),
    setValue: form.current.setValue.bind(form.current),
    validate: form.current.validate.bind(form.current),
    appendArrayItem: form.current.appendArrayItem.bind(form.current),
    removeArrayItem: form.current.removeArrayFieldAt.bind(form.current),
    findArrayItemIndex: form.current.findArrayItemIndex.bind(form.current),
    runValidationOnChange: form.current.runValidationOnChange.bind(form.current),
    stopValidationOnChange: form.current.stopValidationOnChange.bind(form.current),
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
    renderField<TPath extends NestedPaths<TValues>>(path: TPath, callback: RenderFieldCallback<TValues, TPath>) {
      const errors = form.current.getValidationErrors(path);

      return callback({
        getFieldProps(restProps = {}) {
          return {
            value: form.current.getValue(path),
            onChange(e) {
              const value = e.target.value as PathValue<TValues, TPath>;
              form.current.setValue(path, value);
              form.current.setIsDirty(path, true);
              if (form.current.getIsLastSubmitFailed()) {
                form.current.validate();
              }
              restProps.onChange?.(e, { isValid: form.current.validate(path) });
            },
            onBlur(e) {
              form.current.setIsTouched(path, true);
              restProps.onBlur?.(e);
            },
          };
        },
        errors,
        hasErrors: errors.length > 0,
      });
    },
    renderArray<TPath extends NestedPaths<TValues>>(basePath: TPath, callback: RenderArrayCallback, { generateKey }: RenderArrayOptions<TValues, TPath>) {
      const arrayLength = form.current.getArrayLength(basePath);

      const result: any = [];

      for (let i = 0; i < arrayLength; i++) {
        const finalPath = `${basePath}.${i}` as NestedPaths<TValues>;

        const el = callback({
          index: i,
          remove() {
            form.current.removeArrayFieldAt(basePath, i);
          },
        });

        result.push(
          createElement(Fragment, { key: generateKey({ index: i, value: form.current.getValue(finalPath) as PathValue<TValues, TPath> }), children: el }),
        );
      }

      return result;
    },
  };
};

export type UseFormReturn<TValues extends { [key: string]: any }> = ReturnType<typeof useForm<TValues>>;

// export type UseFormReturn<TValues> = {
//   getValue<TPath extends NestedPaths<TValues>>(path: TPath): PathValue<TValues, TPath>;
//   setValue<TPath extends NestedPaths<TValues>>(path: TPath, value: PathValue<TValues, TPath>): void;
//   renderField<TPath extends NestedPaths<TValues>>(path: TPath, callback: RenderFieldCallback<TValues, TPath>): ReactNode;
//   renderArray<TPath extends NestedPaths<TValues>>(path: TPath, callback: RenderArrayCallback, options: RenderArrayOptions<TValues, TPath>): ReactNode;
//   isEdited<TPath extends NestedPaths<TValues>>(path: TPath): boolean;
//   validate<TPath extends NestedPaths<TValues>>(path?: TPath): boolean;
//   handleSubmit(e: FormEvent<HTMLFormElement>): void | Promise<void>;
//   setInitialValues(arg: TValues): void;
//   reset(): void;
//   appendArrayItem<TPath extends NestedPaths<TValues>>(path: TPath, value: Flatten<PathValue<TValues, TPath>>): void;
//   removeArrayItem<TPath extends NestedPaths<TValues>>(path: TPath, at: number): void;
//   findArrayItemIndex<TPath extends NestedPaths<TValues>>(path: TPath, callback: (item: PathValue<TValues, TPath>) => boolean): number;
//   runValidationOnChange<TPath extends NestedPaths<TValues>>(path: TPath): void;
//   stopValidationOnChange<TPath extends NestedPaths<TValues>>(path: TPath): void;
//   isSubmitting: boolean;
// };

export default useForm;
