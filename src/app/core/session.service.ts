import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, BaseStore } from './base.store';

type Session = { isAuthenticated: boolean; user: { email: string; roles: string[] } };

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private initialState: Session = { isAuthenticated: false, user: { email: '', roles: [] } };
  private store$ = new BaseStore<Session>(this.initialState);

  constructor() {
    this.store$.reducers.set('LOG_IN', this.logInReducer);
    this.store$.reducers.set('LOG_OUT', this.logOutReducer);
    this.store$.reducers.set('ADD_ROLE', this.addRoleReducer);
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

  private logInReducer(state: Session, payload: any): Session {
    const session = { ...state };
    session.isAuthenticated = true;
    session.user.email = payload;
    return session;
  }

  private logOutReducer(state: Session, payload: any): Session {
    const session = { ...state };
    session.isAuthenticated = false;
    return session;
  }
  private addRoleReducer(state: Session, payload: string): Session {
    const session = { ...state };
    session.user.roles.push(payload);
    return session;
  }
}
