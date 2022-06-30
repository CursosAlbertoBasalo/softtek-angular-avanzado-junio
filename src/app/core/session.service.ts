import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, BaseStore } from './base.store';
import { LoggerService } from './logger.service';

export type Session = {
  isValidating: boolean;
  isAuthenticated: boolean;
  user: { email: string; password: string; roles: string[] };
};

@Injectable({
  providedIn: 'root',
})
export class SessionFacade {
  private initialState: Session = {
    isValidating: false,
    isAuthenticated: false,
    user: { email: '', password: '', roles: [] },
  };
  private store$ = new BaseStore<Session>(this.initialState);

  constructor(private logger: LoggerService) {
    this.store$.reducer = this.reducer;
    this.logger.warn('Starting store');
  }

  public validateUser(email: string, password: string) {
    const command: Action = { type: 'VALIDATING', payload: { email, password } };
    this.store$.dispatch(command);
    this.logger.log('Starting store');
  }

  public logInUser(email: string) {
    const action: Action = { type: 'LOG_IN', payload: email };
    this.store$.dispatch(action);
  }

  public logOutUser() {
    const action: Action = { type: 'LOG_OUT', payload: null };
    this.store$.dispatch(action);
  }

  public addRole(role: string) {
    const action: Action = { type: 'ADD_ROLE', payload: role };
    this.store$.dispatch(action);
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.store$.select$((session) => session.isAuthenticated);
  }

  public getUserEmail$(): Observable<string> {
    return this.store$.select$((session) => session.user.email);
  }

  public getUserRoles$(): Observable<string[]> {
    return this.store$.select$((session) => session.user.roles);
  }

  public getSession$(): Observable<Session> {
    return this.store$.get$();
  }

  public getValidatingCommand$(): Observable<Action> {
    return this.store$.actionFiltered$('VALIDATING');
  }

  private reducer(current: Session, action: Action): Session {
    const next = { ...current };
    switch (action.type) {
      case 'VALIDATING':
        next.isValidating = true;
        next.user.email = action.payload.email;
        next.user.password = action.payload.password;
        break;
      case 'LOG_IN':
        next.isValidating = false;
        next.isAuthenticated = true;
        next.user.email = action.payload;
        next.user.password = '';
        break;
      case 'LOG_OUT':
        next.isValidating = false;
        next.isAuthenticated = false;
        next.user.password = '';
        break;
      case 'ADD_ROLE':
        next.user.roles.push(action.payload);
        break;
      default:
        break;
    }
    return next;
  }

  // this.store$.reducers.set('VALIDATING', this.validatingReducer);
  // this.store$.reducers.set('LOG_IN', this.logInReducer);
  // this.store$.reducers.set('LOG_OUT', this.logOutReducer);
  // this.store$.reducers.set('ADD_ROLE', this.addRoleReducer);

  // private validatingReducer(current: Session, payload: any): Session {
  //   const next = { ...current };
  //   next.isValidating = true;
  //   next.user.email = payload.email;
  //   next.user.password = payload.password;
  //   return next;
  // }

  // private logInReducer(current: Session, payload: any): Session {
  //   const next = { ...current };
  //   next.isValidating = false;
  //   next.isAuthenticated = true;
  //   next.user.email = payload;
  //   next.user.password = '';
  //   return next;
  // }

  // private logOutReducer(current: Session, payload: any): Session {
  //   const next = { ...current };
  //   next.isValidating = false;
  //   next.isAuthenticated = false;
  //   next.user.password = '';
  //   return next;
  // }
  // private addRoleReducer(state: Session, payload: string): Session {
  //   const session = { ...state };
  //   session.user.roles.push(payload);
  //   return session;
  // }
}
