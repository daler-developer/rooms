import { Schema, ValidationError } from "yup";
import NestedObject from "./NestedObject.ts";
import Parts from "./Parts.ts";

class Form<TValues> {
  private onStateUpdated: () => void;
  private initialValues: TValues;
  private validationSchema: Schema;
  private root: NestedObject;
  private submitCount: number;
  private isLastSubmitFailed: boolean;
  private isSubmitting: boolean;

  constructor({ onStateUpdated, initialValues, validationSchema }: { onStateUpdated: () => void; initialValues: TValues; validationSchema: Schema }) {
    this.submitCount = 0;
    this.onStateUpdated = onStateUpdated;
    this.initialValues = initialValues;
    this.validationSchema = validationSchema;
    this.root = new NestedObject(this.initialValues);
    this.isLastSubmitFailed = false;
    this.isSubmitting = false;
  }

  public getValue(path: string) {
    const pathParts = Parts.createFromString(path);

    return this.root.getValue(pathParts);
  }

  public setValue(path: string, value: unknown) {
    const parts = Parts.createFromString(path);

    this.root.setValue(parts, value);

    if (this.root.getShouldValidateOnChange(parts)) {
      this.validate(path);
    }

    this.onStateUpdated();
  }

  public setValidationErrors(path: string, messages: string) {
    const parts = Parts.createFromString(path);

    this.root.setValidationErrors(parts, messages);
    this.onStateUpdated();
  }

  public getValidationErrors(path: string): string[] {
    const parts = Parts.createFromString(path);

    return this.root.getValidationErrors(parts);
  }

  public constructValues(): TValues {
    return this.root.constructValues();
  }

  public validate(path?: string) {
    this.clearErrors();
    const values = this.constructValues();

    try {
      if (path) {
        this.validationSchema.validateSyncAt(path, values, { abortEarly: false });
      } else {
        this.validationSchema.validateSync(values, { abortEarly: false });
      }

      return true;
    } catch (e) {
      if (e instanceof ValidationError) {
        for (const innerError of e.inner) {
          this.setValidationErrors(Parts.fromYupPath(innerError.path).toStr(), [innerError.message]);
        }
      }

      return false;
    } finally {
      this.onStateUpdated();
    }
  }

  public hasErrors(path?: string) {
    if (path) {
      return this.root.hasErrors(Parts.createFromString(path));
    } else {
      return this.root.hasErrors();
    }
  }

  public setIsTouched(path: string, isTouched: boolean) {
    this.root.setIsTouched(Parts.createFromString(path), isTouched);
    this.onStateUpdated();
  }

  public getIsTouched(path: string) {
    return this.root.getIsTouched(Parts.createFromString(path));
  }

  public getSubmitCount() {
    return this.submitCount;
  }

  public incrementSubmitCount() {
    this.submitCount += 1;
    this.onStateUpdated();
  }

  public clearErrors() {
    this.root.clearErrors();
    this.onStateUpdated();
  }

  public appendArrayItem(path: string, value: unknown) {
    this.root.appendArrayItem(Parts.createFromString(path), value);
    this.onStateUpdated();
  }

  public getArrayLength(path: string) {
    return this.root.getArrayLength(Parts.createFromString(path));
  }

  public removeArrayFieldAt(path: string, at: number) {
    this.root.removeArrayFieldAt(Parts.createFromString(path), at);
    this.onStateUpdated();
  }

  public getIsLastSubmitFailed() {
    return this.isLastSubmitFailed;
  }

  public setIsLastSubmitFailed(to: boolean) {
    this.isLastSubmitFailed = to;
    this.onStateUpdated();
  }

  public getIsSubmitting() {
    return this.isSubmitting;
  }

  public setIsSubmitting(to: boolean) {
    this.isSubmitting = to;
    this.onStateUpdated();
  }

  public reset() {
    this.submitCount = 0;
    this.root = new NestedObject(this.initialValues);
    this.isLastSubmitFailed = false;
    this.isSubmitting = false;
    this.onStateUpdated();
  }

  public setShouldValidateOnChange(path: string, to: boolean) {
    this.root.setShouldValidateOnChange(Parts.createFromString(path), to);
    this.onStateUpdated();
  }

  public getIsEdited(path?: string) {
    if (path) {
      return this.root.getIsEdited(Parts.createFromString(path));
    } else {
      return this.root.getIsEdited();
    }
  }

  public setInitialValues(initialValues: TValues) {
    this.initialValues = initialValues;
    this.root.setInitialValue(initialValues);
    this.onStateUpdated();
  }
}

export default Form;
