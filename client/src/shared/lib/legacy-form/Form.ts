import { Schema, ValidationError } from "yup";
import NestedObject from "@/shared/lib/legacy-form/NestedObject.ts";
import Parts from "@/shared/lib/legacy-form/Parts.ts";

class Form {
  private onStateUpdated: () => void;
  private initialValues: any;
  private validationSchema: Schema;
  private root: NestedObject;
  private submitCount: number;
  private isLastSubmitFailed: boolean;

  constructor({ onStateUpdated, initialValues, validationSchema }: { onStateUpdated: () => void; initialValues: unknown; validationSchema: Schema }) {
    this.submitCount = 0;
    this.onStateUpdated = onStateUpdated;
    this.initialValues = initialValues;
    this.validationSchema = validationSchema;
    this.root = new NestedObject(this.initialValues);
    this.isLastSubmitFailed = false;
  }

  public getValue(path?: string) {
    const pathParts = Parts.createFromString(path);

    return this.root.getValue(pathParts);
  }

  public setValue(path: string, value: unknown) {
    const parts = Parts.createFromString(path);

    this.root.setValue(parts, value);
    this.onStateUpdated();
  }

  public setValidationErrors(path: string, messages: string) {
    const parts = Parts.createFromString(path);

    this.root.setValidationErrors(parts, messages);
    this.onStateUpdated();
  }

  public getValidationErrors(path: string) {
    const parts = Parts.createFromString(path);

    return this.root.getValidationErrors(parts);
  }

  public constructValues() {
    return this.root.constructValues();
  }

  public validate() {
    this.clearErrors();
    const values = this.constructValues();

    try {
      this.validationSchema.validateSync(values, { abortEarly: false });

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

  public reset() {
    this.submitCount = 0;
    this.root = new NestedObject(this.initialValues);
    this.isLastSubmitFailed = false;
  }
}

export default Form;
