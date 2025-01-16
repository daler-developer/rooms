import Field from "./Field.ts";
import NestedArray from "./NestedArray.ts";
import { isArray, isPlainObject } from "./utils.ts";
import Parts from "./Parts.ts";

class NestedObject {
  private values: Record<string, Field | NestedObject | NestedArray>;
  private initialValues: any;

  constructor(initialValues: any) {
    this.values = {};
    this.initialValues = initialValues;
    this.init();
  }

  private init() {
    for (const key of Object.keys(this.initialValues)) {
      const value = this.initialValues[key];

      if (isArray(value)) {
        this.values[key] = new NestedArray(value);
      } else if (isPlainObject(value)) {
        this.values[key] = new NestedObject(value);
      } else {
        // primitive
        this.values[key] = new Field(value);
      }
    }
  }

  public getValue(pathParts: Parts) {
    if (pathParts.isEmpty()) {
      const result = {};

      for (const key of Object.keys(this.values)) {
        result[key] = this.values[key].getValue(pathParts);
      }

      return result;
    } else {
      return this.values[pathParts.first()].getValue(pathParts.slice(1));
    }
  }

  public setValue(pathParts: Parts, value: unknown) {
    this.values[pathParts.first()].setValue(pathParts.slice(1), value);
    // if (pathParts.isEmpty()) {
    //   for (const newObjectValueKey of Object.keys(newObjectValue)) {
    //     if (key in this.values) {
    //       this.values[key].setValue(pathParts, newObjectValue[newObjectValueKey]);
    //     } else {
    //       throw new Error("setValue");
    //     }
    //   }
    // } else {
    //   this.values[pathParts.first()].setValue(pathParts.slice(1), value);
    // }
  }

  public constructValues() {
    const res = {};

    for (const key of Object.keys(this.values)) {
      res[key] = this.values[key].constructValues();
    }

    return res;
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
      for (const path of Object.keys(this.values)) {
        if (this.values[path].hasErrors()) {
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
    for (const key of Object.keys(this.values)) {
      this.values[key].clearErrors();
    }
  }

  public appendArrayItem(pathParts: Parts, value: unknown) {
    this.values[pathParts.first()].appendArrayItem(pathParts.slice(1), value);
  }

  public getArrayLength(pathParts: Parts) {
    if (pathParts.isEmpty()) {
      throw new Error("getArrayLength");
    } else {
      return this.values[pathParts.first()].getArrayLength(pathParts.slice(1));
    }
  }

  public removeArrayFieldAt(pathParts: Parts, at: number) {
    if (pathParts.isEmpty()) {
      throw new Error("removeArrayFieldAt");
    } else {
      this.values[pathParts.first()].removeArrayFieldAt(pathParts.slice(1), at);
    }
  }

  public reset() {
    for (const value of Object.values(this.values)) {
      value.reset();
    }
  }

  public getShouldValidateOnChange(pathParts: Parts) {
    return this.values[pathParts.first()].getShouldValidateOnChange(pathParts.slice(1));
  }

  public setShouldValidateOnChange(pathParts: Parts, to: boolean) {
    this.values[pathParts.first()].setShouldValidateOnChange(pathParts.slice(1), to);
  }

  public getIsEdited(pathParts?: Parts) {
    if (!pathParts || pathParts.isEmpty()) {
      for (let value of Object.values(this.values)) {
        if (value.getIsEdited()) {
          return true;
        }
      }

      return false;
    } else {
      return this.values[pathParts.first()].getIsEdited(pathParts.slice(1));
    }
  }

  public setInitialValue(value: unknown) {
    for (const key of Object.keys(this.values)) {
      this.values[key].setInitialValue(value[key]);
    }
  }
}

export default NestedObject;
