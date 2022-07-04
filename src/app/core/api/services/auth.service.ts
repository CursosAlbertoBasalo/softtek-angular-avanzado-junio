import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionFacade } from '../../session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private sessionFacade: SessionFacade, private http: HttpClient) {
    this.sessionFacade.getValidatingCommand$().subscribe((action) => {
      this.validatingEffect(action.payload);
    });
  }

  private validatingEffect(credentials: any) {
    this.http.post<string>('', credentials).subscribe(
      (access_token: string) =>
        this.sessionFacade.logInUser({ email: credentials.email, access_token }),
      (error: any) => this.sessionFacade.logOutUser()
    );
  }
}
// { action, current, next }
