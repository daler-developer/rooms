// @ts-nocheck
class Field<TValue> {
  public initialValue: TValue;
  public value: TValue;
  public validationErrors: string[];
  public additionalErrors: string[];
  public isTouched: boolean;
  public isDirty: boolean;
  public shouldValidateOnChange: boolean;

  constructor(value: any) {
    this.initialValue = value;
    this.value = value;
    this.validationErrors = [];
    this.additionalErrors = [];
    this.isTouched = false;
    this.isDirty = false;
    this.shouldValidateOnChange = false;
  }

  public setValue(_: never, value: TValue): void {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public setIsTouched(_: unknown, isTouched: boolean): void {
    this.isTouched = isTouched;
  }

  public setIsDirty(_: unknown, isDirty: boolean): void {
    this.isDirty = isDirty;
  }

  public setValidationErrors(_: unknown, validationErrors: string[]): void {
    this.validationErrors = validationErrors;
  }

  public appendValidationErrors(validationError: string): void {
    this.validationErrors.push(validationError);
  }

  public constructValues(): TValue {
    return this.getValue();
  }

  public getValidationErrors(): string[] {
    return this.validationErrors;
  }

  public getAdditionalErrors(): string[] {
    return this.additionalErrors;
  }

  public hasValidationErrors(): boolean {
    return this.getValidationErrors().length > 0;
  }

  public hasAdditionalErrors(): boolean {
    return this.getAdditionalErrors().length > 0;
  }

  public hasErrors(): boolean {
    return this.hasValidationErrors() || this.hasAdditionalErrors();
  }

  public getIsTouched(): boolean {
    return this.isTouched;
  }

  public getIsEdited(): boolean {
    return this.value !== this.initialValue;
  }

  public getIsDirty(): boolean {
    return this.isDirty;
  }

  public clearValidationErrors(): void {
    this.validationErrors = [];
  }

  public clearAdditionalErrors(): void {
    this.additionalErrors = [];
  }

  public clearErrors(): void {
    this.clearValidationErrors();
    this.clearAdditionalErrors();
  }

  public setShouldValidateOnChange(_: never, to: boolean): void {
    this.shouldValidateOnChange = to;
  }

  public getShouldValidateOnChange(): boolean {
    return this.shouldValidateOnChange;
  }

  public setInitialValue(initialValue: TValue): void {
    this.initialValue = initialValue;
  }

  public reset() {}
}

export default Field;
