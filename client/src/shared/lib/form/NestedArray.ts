// @ts-nocheck
import NestedObject from "./NestedObject.ts";
import Field from "./Field.ts";
import { isArray, isPlainObject, pathSlice, pathIsEmpty } from "./utils.ts";
import { NestedPaths, PathValue } from "./types";

type CompiledValues<TValues extends { [key: number]: any }> = Array<Field<TValues[any]> | NestedObject<TValues[any]> | NestedArray<TValues[any]>>;

class NestedArray<TValues extends any[]> {
  private values: CompiledValues<TValues>;
  private initialValues: TValues;

  constructor(initialValues: TValues) {
    this.values = [];
    this.initialValues = initialValues;
    this.init();
  }

  private init() {
    for (const initialValue of this.initialValues) {
      if (isArray(initialValue)) {
        this.values.push(new NestedArray(initialValue));
      } else if (isPlainObject(initialValue)) {
        this.values.push(new NestedObject(initialValue));
      } else {
        // primitive
        this.values.push(new Field(initialValue));
      }
    }
  }

  public getValue<TPath extends NestedPaths<TValues>>(path: TPath) {
    if (pathIsEmpty(path)) {
      const result = [] as TValues;

      for (const value of this.values) {
        result.push(value.getValue(path));
      }

      return result;
    } else {
      return (this.values as any)[pathSlice(path, 1)[0]].getValue(pathSlice(path, 1)[1]);
    }
  }

  public setValue<TPath extends NestedPaths<TValues>>(path: TPath, value: PathValue<TValues, TPath>) {
    (this.values as any)[pathSlice(path, 1)[0]].setValue(pathSlice(path, 1)[1], value);
  }

  public constructValues() {
    const result = [];

    for (const value of this.values) {
      result.push(value.constructValues());
    }

    return result;
  }

  public setValidationErrors(path, messages: string) {
    this.values[pathSlice(path, 1)[0]].setValidationErrors(pathSlice(path, 1)[1], messages);
  }

  public getValidationErrors(path) {
    return this.values[pathSlice(path, 1)[0]].getValidationErrors(pathSlice(path, 1)[1]);
  }

  public hasErrors(path) {
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

  public setIsTouched(path, isTouched: boolean) {
    this.values[pathSlice(path, 1)[0]].setIsTouched(pathSlice(path, 1)[1], isTouched);
  }

  public getIsTouched(path) {
    return this.values[pathSlice(path, 1)[0]].getIsTouched(pathSlice(path, 1)[1]);
  }

  public clearErrors() {
    for (const value of this.values) {
      value.clearErrors();
    }
  }

  public appendArrayItem(path, value: unknown) {
    if (pathIsEmpty(path)) {
      let generatedValue;

      if (isArray(value)) {
        generatedValue = new NestedArray(value);
      } else if (isPlainObject(value)) {
        generatedValue = new NestedObject(value);
      } else {
        // primitive
        generatedValue = new Field(value);
      }

      this.values.push(generatedValue);
    } else {
      this.values[pathSlice(path, 1)[0]].appendArrayItem(pathSlice(path, 1)[1], value);
    }
  }

  public getArrayLength(path) {
    if (pathIsEmpty(path)) {
      return this.values.length;
    } else {
      return this.values[pathSlice(path, 1)[0]].getArrayLength(pathSlice(path, 1)[1]);
    }
  }

  public removeArrayFieldAt(path, at: number) {
    if (pathIsEmpty(path)) {
      this.values.splice(at, 1);
    } else {
      this.values[pathSlice(path, 1)[0]].removeArrayFieldAt(pathSlice(path, 1)[1], at);
    }
  }

  public setShouldValidateOnChange(path, to: boolean) {
    this.values[pathSlice(path, 1)[0]].setShouldValidateOnChange(pathSlice(path, 1)[1], to);
  }

  public getShouldValidateOnChange(path) {
    return this.values[pathSlice(path, 1)[0]].getShouldValidateOnChange(pathSlice(path, 1)[1]);
  }

  public reset() {
    for (const value of this.values) {
      // console.log(value);
      // value.reset();
    }
  }

  public getIsEdited(path) {
    if (!path || pathIsEmpty(path)) {
      for (let value of this.values) {
        if (value.getIsEdited()) {
          return true;
        }
      }

      return false;
    } else {
      return this.values[pathSlice(path, 1)[0]].getIsEdited(pathSlice(path, 1)[1]);
    }
  }

  public setInitialValue(initialValue: unknown[]) {
    for (let i = 0; i < this.values.length; i++) {
      this.values[i].setInitialValue(initialValue[i]);
    }
  }
}

export default NestedArray;
