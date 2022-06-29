import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, BaseStore, Change } from './base.store';

export type Session = {
  isValidating: boolean;
  isAuthenticated: boolean;
  user: { email: string; password: string; roles: string[] };
};

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private initialState: Session = {
    isValidating: false,
    isAuthenticated: false,
    user: { email: '', password: '', roles: [] },
  };
  private store$ = new BaseStore<Session>(this.initialState);

  constructor() {
    this.store$.reducers.set('VALIDATING', this.validatingReducer);
    this.store$.reducers.set('LOG_IN', this.logInReducer);
    this.store$.reducers.set('LOG_OUT', this.logOutReducer);
    this.store$.reducers.set('ADD_ROLE', this.addRoleReducer);
  }

  public validateUser(email: string, password: string) {
    const command: Action = { type: 'VALIDATING', payload: { email, password } };
    this.store$.dispatch(command);
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

  public getValidatingCommand$(): Observable<Change<Session>> {
    return this.store$.filter$('VALIDATING');
  }

  private validatingReducer(state: Session, payload: any): Session {
    const session = { ...state };
    session.isValidating = true;
    session.user.email = payload.email;
    session.user.password = payload.password;
    return session;
  }

  private logInReducer(state: Session, payload: any): Session {
    const session = { ...state };
    session.isValidating = false;
    session.isAuthenticated = true;
    session.user.email = payload;
    session.user.password = '';
    return session;
  }

  private logOutReducer(state: Session, payload: any): Session {
    const session = { ...state };
    session.isValidating = false;
    session.isAuthenticated = false;
    session.user.password = '';
    return session;
  }
  private addRoleReducer(state: Session, payload: string): Session {
    const session = { ...state };
    session.user.roles.push(payload);
    return session;
  }
}
