import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/session.service';

@Component({
  selector: 'stk-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, Dirty {
  public isDirty: boolean = false;
  public form: FormGroup;
  private passwordValidators = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10),
  ];
  constructor(
    formBuilder: FormBuilder,
    private sessionService: SessionService,
    private http: HttpClient
  ) {
    this.form = formBuilder.group({
      email: new FormControl('a@b.c'),
      password: new FormControl('', this.passwordValidators),
    });
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
    errorMessage += errors['minlength']
      ? `🔥 More than ${errors['minlength'].requiredLength} chars`
      : '';
    errorMessage += errors['maxlength']
      ? `🔥 Less than ${errors['maxlength'].requiredLength} chars`
      : '';
    return errorMessage;
  }

  public canDeactivate(): boolean {
    if (!this.isDirty) return true;
    return window.confirm('Exit without save?');
  }

  public getControl(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }
  public onSave() {
    const loginData = this.form.value;
    loginData.email = loginData.email.email || loginData.email;
    console.log('Login data: ', loginData);
    this.sessionService.validateUserCommand(loginData.email, loginData.password);
  }
}

export interface Dirty {
  canDeactivate(): boolean;
}
