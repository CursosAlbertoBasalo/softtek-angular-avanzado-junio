import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stk-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, Dirty {
  public isDirty: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  canDeactivate(): boolean {
    if (!this.isDirty) return true;
    return window.confirm('Exit without save?');
  }
}

export interface Dirty {
  canDeactivate(): boolean;
}
