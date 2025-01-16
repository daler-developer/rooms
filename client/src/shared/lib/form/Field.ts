class Field {
  public initialValue: unknown;
  public value: any;
  public validationErrors: string[];
  public additionalErrors: string[];
  public isTouched: boolean;
  public shouldValidateOnChange: boolean;

  constructor(value: any) {
    this.initialValue = value;
    this.value = value;
    this.validationErrors = [];
    this.additionalErrors = [];
    this.isTouched = false;
    this.shouldValidateOnChange = false;
  }

  public setValue(_, value: any) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public setIsTouched(_: unknown, isTouched: boolean) {
    this.isTouched = isTouched;
  }

  public setValidationErrors(_: unknown, validationErrors: string[]) {
    this.validationErrors = validationErrors;
  }

  public appendValidationErrors(validationError: string) {
    this.validationErrors.push(validationError);
  }

  public constructValues() {
    return this.getValue();
  }

  public getValidationErrors() {
    return this.validationErrors;
  }

  public getAdditionalErrors() {
    return this.additionalErrors;
  }

  public hasValidationErrors() {
    return this.getValidationErrors().length > 0;
  }

  public hasAdditionalErrors() {
    return this.getAdditionalErrors().length > 0;
  }

  public hasErrors() {
    return this.hasValidationErrors() || this.hasAdditionalErrors();
  }

  public getIsTouched() {
    return this.isTouched;
  }

  public getIsEdited() {
    return this.value !== this.initialValue;
  }

  public setIsEdited(to: boolean) {
    this.isEdited = to;
  }

  public clearValidationErrors() {
    this.validationErrors = [];
  }

  public clearAdditionalErrors() {
    this.additionalErrors = [];
  }

  public clearErrors() {
    this.clearValidationErrors();
    this.clearAdditionalErrors();
  }

  public setShouldValidateOnChange(to: boolean) {
    this.shouldValidateOnChange = to;
  }

  public getShouldValidateOnChange() {
    return this.shouldValidateOnChange;
  }

  public setInitialValue(initialValue: unknown) {
    this.initialValue = initialValue;
  }

  public reset() {}
}

export default Field;
