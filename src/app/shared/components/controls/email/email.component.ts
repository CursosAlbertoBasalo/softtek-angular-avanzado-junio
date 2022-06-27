import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'stk-email',
  templateUrl: './email.component.html',
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EmailComponent), multi: true },
  ],
})
export class EmailComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;

  public touchedCallback!: () => void;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public writeValue(email: any): void {
    // email && this.form.setValue({ email }, { emitEvent: false });
  }

  public registerOnChange(changeCallBack: (nv: any) => void): void {
    this.form.valueChanges.subscribe(changeCallBack);
  }

  public registerOnTouched(touchedCallback: () => void): void {
    // this.touchedCallback = touchedCallback;
  }

  ngOnInit(): void {}

  public hasError(controlName: string): boolean {
    const control = this.getControl(controlName);
    if (!control) return false;
    return control.invalid;
  }

  public mustShowMessage(controlName: string): boolean {
    const control = this.getControl(controlName);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  public getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    if (!control) return '';
    if (!control.errors) return '';
    const errors = control.errors;
    let errorMessage = '';
    errorMessage += errors['required'] ? '🔥 Field is required' : '';
    errorMessage += errors['email'] ? '🔥 Should be an email address' : '';
    return errorMessage;
  }

  public getControl(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }
}
