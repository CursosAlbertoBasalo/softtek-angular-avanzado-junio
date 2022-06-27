import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'stk-template',
  templateUrl: './template.component.html',
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TemplateComponent), multi: true },
  ],
})
export class TemplateComponent implements OnInit, ControlValueAccessor {
  @Input() public formControlName: string = '';
  @Input() public type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public control!: AbstractControl | null;

  public value: any;
  private changedCallback!: (value: any) => void;
  private touchedCallback!: () => void;

  constructor() {}

  ngOnInit(): void {}

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(changeCallBack: (nv: any) => void): void {
    this.changedCallback = changeCallBack;
  }

  public registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }

  public onChange(event: any) {
    this.value = event.target.value;
    this.changedCallback(this.value);
    this.touchedCallback();
  }

  public onBlur() {
    this.touchedCallback();
  }

  public hasError(): boolean {
    return this.control?.invalid || false;
  }
  public mustShowMessage(): boolean {
    return (this.control?.touched && this.control?.invalid) || false;
  }
  public getErrorMessage(): string {
    if (!this.control) return '';
    if (!this.control.errors) return '';
    const errors = this.control.errors;
    let errorMessage = '';
    errorMessage += errors['required'] ? '🔥 Field is required' : '';
    errorMessage += errors['email'] ? '🔥 Should be an email address' : '';
    errorMessage += errors['minlength']
      ? `🔥 More than ${errors['minlength'].requiredLength} chars`
      : '';
    errorMessage += errors['maxlength']
      ? `🔥 Less than ${errors['maxlength'].requiredLength} chars`
      : '';
    return errorMessage;
  }
}
