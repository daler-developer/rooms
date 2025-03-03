// @ts-nocheck
import Field from "./Field.ts";
import NestedArray from "./NestedArray.ts";
import { isArray, isPlainObject, pathSlice, pathIsEmpty } from "./utils.ts";
import { NestedPaths, PathValue } from "./types";

type CompiledValues<TValues extends { [key: string]: any }> = {
  [key in keyof TValues]: Field<TValues[key]> | NestedObject<TValues[key]>;
};

class NestedObject<TValues extends { [key: string]: any }> {
  private values: CompiledValues<TValues> = {} as CompiledValues<TValues>;
  private initialValues: TValues;

  constructor(initialValues: TValues) {
    this.initialValues = initialValues;
    for (const key of Object.keys(this.initialValues)) {
      const value = this.initialValues[key];

      if (isArray(value)) {
        (this.values as any)[key] = new NestedArray(value);
      } else if (isPlainObject(value)) {
        (this.values as any)[key] = new NestedObject(value);
      } else {
        // primitive
        (this.values as any)[key] = new Field(value);
      }
    }
  }

  public getValue<TPath extends NestedPaths<TValues>>(path: TPath) {
    if (pathIsEmpty(path)) {
      const result = {} as TValues;

      for (const key of Object.keys(this.values)) {
        (result as any)[key] = (this.values as any)[key].getValue(path);
      }

      return result;
    } else {
      return this.values[pathSlice(path, 1)[0]].getValue(pathSlice(path, 1)[1]);
    }
  }

  public setValue<TPath extends NestedPaths<TValues>>(path: TPath, value: PathValue<TValues, TPath>) {
    (this.values as any)[pathSlice(path, 1)[0]].setValue(pathSlice(path, 1)[1], value);
  }

  public constructValues(): TValues {
    const res = {} as TValues;

    for (const key of Object.keys(this.values)) {
      (res as any)[key] = this.values[key].constructValues();
    }

    return res;
  }

  public setValidationErrors<TPath extends NestedPaths<TValues>>(path: TPath, messages: string[]) {
    this.values[pathSlice(path, 1)[0]].setValidationErrors(pathSlice(path, 1)[1], messages);
  }

  public getValidationErrors<TPath extends NestedPaths<TValues>>(path: TPath) {
    return this.values[pathSlice(path, 1)[0]].getValidationErrors(pathSlice(path, 1)[1]);
  }

  public hasErrors<TPath extends NestedPaths<TValues>>(path?: TPath) {
    if (path) {
      return this.values[pathSlice(path, 1)[0]].hasErrors(pathSlice(path, 1)[1]);
    } else {
      for (const path of Object.keys(this.values)) {
        if (this.values[path].hasErrors()) {
          return true;
        }
      }

      return false;
    }
  }

  public setIsTouched<TPath extends NestedPaths<TValues>>(path: TPath, isTouched: boolean) {
    this.values[pathSlice(path, 1)[0]].setIsTouched(pathSlice(path, 1)[1], isTouched);
  }

  public getIsTouched<TPath extends NestedPaths<TValues>>(path: TPath) {
    return this.values[pathSlice(path, 1)[0]].getIsTouched(pathSlice(path, 1)[1]);
  }

  public clearErrors() {
    for (const key of Object.keys(this.values)) {
      this.values[key].clearErrors();
    }
  }

  public appendArrayItem<TPath extends NestedPaths<TValues>>(path: TPath, value) {
    this.values[pathSlice(path, 1)[0]].appendArrayItem(pathSlice(path, 1)[1], value);
  }

  public getArrayLength<TPath extends NestedPaths<TValues>>(path: TPath) {
    if (pathIsEmpty(path)) {
      throw new Error("getArrayLength");
    } else {
      return this.values[pathSlice(path, 1)[0]].getArrayLength(pathSlice(path, 1)[1]);
    }
  }

  public removeArrayFieldAt<TPath extends NestedPaths<TValues>>(path: TPath, at: number) {
    if (pathIsEmpty(path)) {
      throw new Error("removeArrayFieldAt");
    } else {
      this.values[pathSlice(path, 1)[0]].removeArrayFieldAt(pathSlice(path, 1)[1], at);
    }
  }

  public reset() {
    for (const value of Object.values(this.values)) {
      value.reset();
    }
  }

  public getShouldValidateOnChange<TPath extends NestedPaths<TValues>>(path: TPath) {
    return this.values[pathSlice(path, 1)[0]].getShouldValidateOnChange(pathSlice(path, 1)[1]);
  }

  public setShouldValidateOnChange<TPath extends NestedPaths<TValues>>(path: TPath, to: boolean) {
    this.values[pathSlice(path, 1)[0]].setShouldValidateOnChange(pathSlice(path, 1)[1], to);
  }

  public getIsEdited<TPath extends NestedPaths<TValues>>(path?: TPath) {
    if (!path || pathIsEmpty(path)) {
      for (let value of Object.values(this.values)) {
        if (value.getIsEdited()) {
          return true;
        }
      }

      return false;
    } else {
      return this.values[pathSlice(path, 1)[0]].getIsEdited(pathSlice(path, 1)[1]);
    }
  }

  public setInitialValue(value: TValues) {
    for (const key of Object.keys(this.values)) {
      this.values[key].setInitialValue(value[key]);
    }
  }
}

export default NestedObject;
