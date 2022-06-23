import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Dirty } from './login.component';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanDeactivate<Dirty> {
  canDeactivate(
    component: Dirty,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    return component.canDeactivate();
  }
}
