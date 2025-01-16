import NestedObject from "@/shared/lib/legacy-form/NestedObject.ts";
import Field from "./Field.ts";
import { isArray, isObject } from "@/shared/lib/legacy-form/utils.ts";
import Parts from "@/shared/lib/legacy-form/Parts.ts";

class NestedArray {
  private values: Array<NestedObject | NestedArray | Field<any>>;
  private initialValues: Array<unknown>;

  constructor(initialValues: Array<unknown>) {
    this.values = [];
    this.initialValues = initialValues;
    this.init();
  }

  private init() {
    for (const initialValue of this.initialValues) {
      if (isArray(initialValue)) {
        this.values.push(new NestedArray(initialValue));
      } else if (isObject(initialValue)) {
        this.values.push(new NestedObject(initialValue));
      } else {
        // primitive
        this.values.push(new Field(initialValue));
      }
    }
  }

  public getValue(pathParts: Parts) {
    if (pathParts.isEmpty()) {
      const result = [];

      for (const value of this.values) {
        result.push(value.getValue(pathParts));
      }

      return result;
    } else {
      return this.values[pathParts.first() as number].getValue(pathParts.slice(1));
    }
  }

  public setValue(pathParts: Parts, value: unknown) {
    this.values[pathParts.first() as number].setValue(pathParts.slice(1), value);
  }

  public constructValues() {
    const result = [];

    for (const value of this.values) {
      result.push(value.constructValues());
    }

    return result;
  }

  public setValidationErrors(pathParts: Parts, messages: string) {
    this.values[pathParts.first()].setValidationErrors(pathParts.slice(1), messages);
  }

  public getValidationErrors(pathParts: Parts) {
    return this.values[pathParts.first()].getValidationErrors(pathParts.slice(1));
  }

  public hasErrors(pathParts?: Parts) {
    if (pathParts) {
      return this.values[pathParts.first()].hasErrors(pathParts.slice(1));
    } else {
      for (const value of this.values) {
        if (value.hasErrors()) {
          return true;
        }
      }

      return false;
    }
  }

  public setIsTouched(pathParts: Parts, isTouched: boolean) {
    this.values[pathParts.first()].setIsTouched(pathParts.slice(1), isTouched);
  }

  public getIsTouched(pathParts: Parts) {
    return this.values[pathParts.first()].getIsTouched(pathParts.slice(1));
  }

  public clearErrors() {
    for (const value of this.values) {
      value.clearErrors();
    }
  }

  public appendArrayItem(pathParts: Parts, value: unknown) {
    if (pathParts.isEmpty()) {
      let generatedValue;

      if (isArray(value)) {
        generatedValue = new NestedArray(value);
      } else if (isObject(value)) {
        generatedValue = new NestedObject(value);
      } else {
        // primitive
        generatedValue = new Field(value);
      }

      this.values.push(generatedValue);
    } else {
      this.values[pathParts.first()].appendArrayItem(pathParts.slice(1), value);
    }
  }

  public getArrayLength(pathParts: Parts) {
    if (pathParts.isEmpty()) {
      return this.values.length;
    } else {
      return this.values[pathParts.first()].getArrayLength(pathParts.slice(1));
    }
  }

  public removeArrayFieldAt(pathParts: Parts, at: number) {
    if (pathParts.isEmpty()) {
      this.values.splice(at, 1);
    } else {
      this.values[pathParts.first()].removeArrayFieldAt(pathParts.slice(1), at);
    }
  }

  public reset() {
    for (const value of this.values) {
      // console.log(value);
      // value.reset();
    }
  }
}

export default NestedArray;
