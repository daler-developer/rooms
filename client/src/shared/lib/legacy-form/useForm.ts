import { ChangeEvent, useEffect, useState, ComponentProps } from "react";
import { Schema, ValidationError } from "yup";
import { initFields, extractValues, fieldsUpdateValues, fieldsClearErrors, convertYupErrorPath, fieldsHasValidationErrors } from "./utils.ts";
import { Fields } from "./types.ts";
import _ from "lodash";

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

type Path<T, K extends string[]> = K extends []
  ? T
  : K extends [infer F, ...infer R]
  ? F extends keyof T
    ? Path<T[F], Extract<R, string[]>>
    : F extends `${infer N}`
    ? N extends `${number}`
      ? T extends Array<infer U>
        ? Path<U, Extract<R, string[]>>
        : never
      : never
    : never
  : never;

type UseForm<TValues> = {
  initialValues: TValues;
  validationSchema: Schema;
  onSubmit: (values: TValues) => void | Promise<void>;
};

const useForm = <TValues extends { [key: string]: unknown }>({ initialValues, validationSchema, onSubmit }: UseForm<TValues>) => {
  const [fields, setFields] = useState<Fields>(() => {
    return initFields(initialValues);
  });
  const [setValueCounter, setSetValueCounter] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLastSubmitFailed, setIsLastSubmitFailed] = useState(false);

  useEffect(() => {
    triggerValidation();
  }, [setValueCounter]);

  const hasValidationErrors = fieldsHasValidationErrors(fields);

  const getErrors = (path: string) => {
    const parts = path.split(".");

    let cur = fields;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      cur = cur[part];
    }

    const result = [...cur.additionalErrors];

    if (isLastSubmitFailed) {
      result.push(...cur.validationErrors);
    }

    return result;
  };

  const hasErrors = (path: string) => {
    return getErrors(path).length > 0;
  };

  const getValue = <P extends string>(path: P): Path<TValues, Split<P, ".">> => {
    const parts = path.split(".");

    let cur = fields;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      cur = cur[part];
    }

    return extractValues(cur);
  };

  const setValue = (path: string, value: unknown) => {
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      const parts = path.split(".");

      let cur = fieldsCopy;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        cur = cur[part];
      }

      fieldsUpdateValues(cur, value);

      return fieldsCopy;
    });
    setSetValueCounter((prev) => prev + 1);
  };

  const setAdditionalErrors = (path: string, errors: string[]) => {
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      const parts = path.split(".");

      let cur = fieldsCopy;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        cur = cur[part];
      }

      cur.additionalErrors = [...errors];

      return fieldsCopy;
    });
  };

  const isTouched = (path: string) => {
    const parts = path.split(".");

    let cur = fields;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      cur = cur[part];
    }

    return cur.isTouched;
  };

  const touch = (path: string) => {
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      const parts = path.split(".");

      let cur = fieldsCopy;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        cur = cur[part];
      }

      cur.isTouched = true;

      return fieldsCopy;
    });
  };

  const getFieldProps = (path: string): Pick<ComponentProps<"input">, "value" | "onChange" | "onBlur"> => {
    return {
      value: getValue(path),
      onChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        setValue(path, value);
      },
      onBlur() {
        touch(path);
      },
    };
  };

  const clearValidationErrors = (path?: string) => {
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      let cur = fieldsCopy;

      if (path) {
        const parts = path.split(".");

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];

          cur = cur[part];
        }
      }

      fieldsClearErrors(cur, { clearAdditionalErrors: false, clearValidationErrors: true });

      return fieldsCopy;
    });
  };

  const setValidationErrors = (path: string, errors: string[]) => {
    // console.log(path);
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      const parts = path.split(".");

      let cur = fieldsCopy;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        cur = cur[part];
      }

      cur.validationErrors = [...errors];

      return fieldsCopy;
    });
  };

  const clearAdditionalErrors = (path?: string) => {
    setFields((prev) => {
      const fieldsCopy = _.cloneDeep(prev);

      let cur = fieldsCopy;

      if (path) {
        const parts = path.split(".");

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];

          cur = cur[part];
        }
      }

      fieldsClearErrors(cur, { clearAdditionalErrors: true, clearValidationErrors: false });

      return fieldsCopy;
    });
  };

  const triggerValidation = async (path?: string) => {
    try {
      clearValidationErrors(path);

      if (path) {
        await validationSchema.validateAt(path, extractValues(fields), { abortEarly: false });

        clearValidationErrors(path);
      } else {
        await validationSchema.validate(extractValues(fields), {
          abortEarly: false,
        });
        clearValidationErrors();
      }

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((error) => {
          setValidationErrors(convertYupErrorPath(error.path!), error.errors);
        });
      }

      return false;
    }
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    if (hasValidationErrors) {
      setIsLastSubmitFailed(true);
    } else {
      clearAdditionalErrors();

      const submitResult = onSubmit(extractValues(fields));

      if (submitResult instanceof Promise) {
        setIsSubmitting(true);
        await submitResult;
        setIsSubmitting(false);
      }

      setIsLastSubmitFailed(false);
      reset();
    }
  };

  const clearErrors = (path?: string) => {
    clearValidationErrors(path);
    clearAdditionalErrors(path);
  };

  const reset = () => {
    clearErrors();
    setFields(initFields(initialValues));
    setSetValueCounter(0);
    setIsSubmitting(false);
    setIsLastSubmitFailed(false);
  };

  return {
    getValue,
    setValue,
    setErrors(path: string, errors: string[]) {
      setAdditionalErrors(path, errors);
    },
    isTouched,
    touch,
    getFieldProps,
    isSubmitting,
    handleSubmit,
    clearErrors,
    triggerValidation,
    getErrors,
    hasErrors,
    reset,
  };
};

export default useForm;
