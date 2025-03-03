import { Schema, ValidationError } from "yup";
import NestedObject from "./NestedObject.ts";
import { convertYupPath } from "./utils.ts";
import { NestedPaths, PathValue } from "./types";

class Form<TValues extends { [key: string]: any }> {
  private onStateUpdated: () => void;
  private initialValues: TValues;
  private validationSchema: Schema;
  private root: NestedObject<TValues>;
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

  public getValue<TPath extends NestedPaths<TValues>>(path: TPath): PathValue<TValues, TPath> {
    return this.root.getValue(path);
  }

  public setValue<TPath extends NestedPaths<TValues>>(path: TPath, value: PathValue<TValues, TPath>) {
    this.root.setValue(path, value);

    if (this.root.getShouldValidateOnChange(path)) {
      this.validate(path);
    }

    this.onStateUpdated();
  }

  public setValidationErrors<TPath extends NestedPaths<TValues>>(path: TPath, messages: string[]) {
    this.root.setValidationErrors(path, messages);
    this.onStateUpdated();
  }

  public getValidationErrors<TPath extends NestedPaths<TValues>>(path: TPath): string[] {
    return this.root.getValidationErrors(path);
  }

  public constructValues(): TValues {
    return this.root.constructValues();
  }

  public validate<TPath extends NestedPaths<TValues>>(path?: TPath) {
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
          if (innerError.path) {
            this.setValidationErrors(convertYupPath(innerError.path) as NestedPaths<TValues>, [innerError.message]);
          }
        }
      }

      return false;
    } finally {
      this.onStateUpdated();
    }
  }

  public hasErrors<TPath extends NestedPaths<TValues>>(path?: TPath): boolean {
    return this.root.hasErrors(path);
  }

  public setIsTouched<TPath extends NestedPaths<TValues>>(path: TPath, isTouched: boolean): void {
    this.root.setIsTouched(path, isTouched);
    this.onStateUpdated();
  }

  public getIsTouched<TPath extends NestedPaths<TValues>>(path: TPath): boolean {
    return this.root.getIsTouched(path);
  }

  public getSubmitCount(): number {
    return this.submitCount;
  }

  public incrementSubmitCount(): void {
    this.submitCount += 1;
    this.onStateUpdated();
  }

  public clearErrors(): void {
    this.root.clearErrors();
    this.onStateUpdated();
  }

  public appendArrayItem<TPath extends NestedPaths<TValues>>(path: TPath, value: Flatten<PathValue<TValues, TPath>>) {
    this.root.appendArrayItem(path, value);
    this.onStateUpdated();
  }

  public getArrayLength<TPath extends NestedPaths<TValues>>(path: TPath): number {
    return this.root.getArrayLength(path);
  }

  public removeArrayFieldAt<TPath extends NestedPaths<TValues>>(path: TPath, at: number): void {
    this.root.removeArrayFieldAt(path, at);
    this.onStateUpdated();
  }

  public getIsLastSubmitFailed(): boolean {
    return this.isLastSubmitFailed;
  }

  public setIsLastSubmitFailed(to: boolean): void {
    this.isLastSubmitFailed = to;
    this.onStateUpdated();
  }

  public getIsSubmitting() {
    return this.isSubmitting;
  }

  public setIsSubmitting(to: boolean): void {
    this.isSubmitting = to;
    this.onStateUpdated();
  }

  public reset(): void {
    this.submitCount = 0;
    this.root = new NestedObject(this.initialValues);
    this.isLastSubmitFailed = false;
    this.isSubmitting = false;
    this.onStateUpdated();
  }

  public setShouldValidateOnChange<TPath extends NestedPaths<TValues>>(path: TPath, to: boolean): void {
    this.root.setShouldValidateOnChange(path, to);
    this.onStateUpdated();
  }

  public getIsEdited<TPath extends NestedPaths<TValues>>(path?: TPath): boolean {
    if (path) {
      return this.root.getIsEdited(path);
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
